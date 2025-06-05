"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { lessons } from "@/data/lessons";
import { UserService } from "@/lib/services/user-service";

// Custom interfaces to replace Prisma types
interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: string;
  progressPercentage: number;
  attempts: number;
  bestScore: number | null;
  totalTimeSpent: number;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserLessons() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get user progress for all lessons
    const userProgress = await db.userLessonProgress.findMany({
      where: { userId: user.id },
    });

    // Create a map for quick lookup
    const progressMap = new Map(
      userProgress.map((p: UserLessonProgress) => [p.lessonId, p]),
    );

    // Filter and sort lessons based on user experience level
    const getStartingLessonIndex = (experience: string | null) => {
      switch (experience) {
        case "absolute-beginner":
          return 0;
        case "some-words":
          return 3; // Skip first few basic lessons
        case "basic-conversations":
          return 8;
        case "intermediate":
          return 15;
        case "advanced":
          return 25;
        default:
          return 0;
      }
    };

    const startIndex = getStartingLessonIndex(user.experience);
    const availableLessons = lessons.slice(startIndex);

    // Combine static lesson data with user progress
    return availableLessons.map((lesson) => {
      const progress = progressMap.get(lesson.id.toString()) as UserLessonProgress | undefined;
      return {
        ...lesson,
        completed: progress?.status === "completed",
        progress: progress?.progressPercentage || 0,
        bestScore: progress?.bestScore || 0,
        attempts: progress?.attempts || 0,
        startedAt: progress?.startedAt,
        completedAt: progress?.completedAt,
      };
    });
  } catch (error) {
    console.error("Error fetching user lessons:", error);
    throw error;
  }
}

export async function startLesson(lessonId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Check if lesson progress already exists
    let progress = await db.userLessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
    });

    // Create or update progress
    if (!progress) {
      progress = await db.userLessonProgress.create({
        data: {
          userId: user.id,
          lessonId: lessonId,
          status: "in_progress",
          startedAt: new Date(),
        },
      });
    } else if (progress.status === "pending") {
      progress = await db.userLessonProgress.update({
        where: { id: progress.id },
        data: {
          status: "in_progress",
          startedAt: new Date(),
        },
      });
    }

    return progress;
  } catch (error) {
    console.error("Error starting lesson:", error);
    throw error;
  }
}

export async function updateExerciseProgress(
  lessonId: string,
  xpEarned: number,
  exerciseIndex?: number,
  totalExercises?: number,
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Update user XP and streak
    const updatedUser = await UserService.updateUserXP(userId, xpEarned);

    // Find or create lesson progress
    let progress = await db.userLessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
    });

    // Calculate progress percentage if we have exercise info
    let progressPercentage = 0;
    if (exerciseIndex !== undefined && totalExercises !== undefined) {
      progressPercentage = Math.round(
        ((exerciseIndex + 1) / totalExercises) * 100,
      );
    }

    if (!progress) {
      // Create new progress if it doesn't exist
      progress = await db.userLessonProgress.create({
        data: {
          userId: user.id,
          lessonId: lessonId,
          status: "in_progress",
          progressPercentage: progressPercentage,
          startedAt: new Date(),
          attempts: 1,
        },
      });
    } else {
      // Update existing progress
      progress = await db.userLessonProgress.update({
        where: { id: progress.id },
        data: {
          attempts: progress.attempts + 1,
          progressPercentage: Math.max(
            progress.progressPercentage || 0,
            progressPercentage,
          ),
          status: "in_progress",
        },
      });
    }

    // Update daily stats with XP
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await db.dailyStats.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        xpEarned: { increment: xpEarned },
      },
      create: {
        userId: user.id,
        date: today,
        xpEarned: xpEarned,
        lessonsCompleted: 0,
      },
    });

    return {
      progress,
      userXp: updatedUser.totalXp,
      leveledUp:
        Math.floor(updatedUser.totalXp / 100) > Math.floor(user.totalXp / 100),
    };
  } catch (error) {
    console.error("Error updating exercise progress:", error);
    throw error;
  }
}
