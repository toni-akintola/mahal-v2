"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, userLessonProgress, dailyStats } from "@/lib/db/schema";
import { lessons } from "@/data/lessons";
import { UserService } from "@/lib/services/user-service";
import { eq, and, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

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

    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    if (!user.length) throw new Error("User not found");

    // Get user progress for all lessons
    const userProgress = await db
      .select()
      .from(userLessonProgress)
      .where(eq(userLessonProgress.userId, user[0].id));

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

    const startIndex = getStartingLessonIndex(user[0].experience);
    const availableLessons = lessons.slice(startIndex);

    // Combine static lesson data with user progress
    return availableLessons.map((lesson) => {
      const progress = progressMap.get(lesson.id.toString()) as
        | UserLessonProgress
        | undefined;
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

    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    if (!user.length) throw new Error("User not found");

    // Check if lesson progress already exists
    const progress = await db
      .select()
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, user[0].id),
          eq(userLessonProgress.lessonId, lessonId),
        ),
      )
      .limit(1);

    // Create or update progress
    if (!progress.length) {
      const newProgress = await db
        .insert(userLessonProgress)
        .values({
          id: nanoid(),
          userId: user[0].id,
          lessonId: lessonId,
          status: "in_progress",
          startedAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      return newProgress[0];
    } else if (progress[0].status === "pending") {
      const updatedProgress = await db
        .update(userLessonProgress)
        .set({
          status: "in_progress",
          startedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(userLessonProgress.id, progress[0].id))
        .returning();
      return updatedProgress[0];
    }

    return progress[0];
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

    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    if (!user.length) throw new Error("User not found");

    // Update user XP and streak
    const updatedUser = await UserService.updateUserXP(userId, xpEarned);

    // Find or create lesson progress
    const progress = await db
      .select()
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, user[0].id),
          eq(userLessonProgress.lessonId, lessonId),
        ),
      )
      .limit(1);

    // Calculate progress percentage if we have exercise info
    let progressPercentage = 0;
    if (exerciseIndex !== undefined && totalExercises !== undefined) {
      progressPercentage = Math.round(
        ((exerciseIndex + 1) / totalExercises) * 100,
      );
    }

    let progressResult;
    if (!progress.length) {
      // Create new progress if it doesn't exist
      const newProgress = await db
        .insert(userLessonProgress)
        .values({
          id: nanoid(),
          userId: user[0].id,
          lessonId: lessonId,
          status: "in_progress",
          progressPercentage: progressPercentage,
          startedAt: new Date(),
          attempts: 1,
          updatedAt: new Date(),
        })
        .returning();
      progressResult = newProgress[0];
    } else {
      // Update existing progress
      const updatedProgress = await db
        .update(userLessonProgress)
        .set({
          attempts: progress[0].attempts + 1,
          progressPercentage: Math.max(
            progress[0].progressPercentage || 0,
            progressPercentage,
          ),
          status: "in_progress",
          updatedAt: new Date(),
        })
        .where(eq(userLessonProgress.id, progress[0].id))
        .returning();
      progressResult = updatedProgress[0];
    }

    // Update daily stats with XP
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if daily stats exist for today
    const existingDailyStats = await db
      .select()
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, user[0].id),
          eq(dailyStats.date, today.toISOString().split("T")[0]),
        ),
      )
      .limit(1);

    if (existingDailyStats.length) {
      // Update existing daily stats
      await db
        .update(dailyStats)
        .set({
          xpEarned: sql`${dailyStats.xpEarned} + ${xpEarned}`,
          updatedAt: new Date(),
        })
        .where(eq(dailyStats.id, existingDailyStats[0].id));
    } else {
      // Create new daily stats
      await db.insert(dailyStats).values({
        id: nanoid(),
        userId: user[0].id,
        date: today.toISOString().split("T")[0],
        xpEarned: xpEarned,
        lessonsCompleted: 0,
        updatedAt: new Date(),
      });
    }

    return {
      progress: progressResult,
      userXp: updatedUser.totalXp,
      leveledUp:
        Math.floor(updatedUser.totalXp / 100) >
        Math.floor(user[0].totalXp / 100),
    };
  } catch (error) {
    console.error("Error updating exercise progress:", error);
    throw error;
  }
}
