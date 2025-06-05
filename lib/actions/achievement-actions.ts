"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UserService } from "@/lib/services/user-service";

export async function getUserAchievements() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get all achievements with user progress
    const achievements = await db.achievement.findMany({
      include: {
        userAchievements: {
          where: { userId: user.id },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Format achievements with progress data
    return achievements.map((achievement) => {
      const userAchievement = achievement.userAchievements[0];
      return {
        id: achievement.id,
        key: achievement.key,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        xpReward: achievement.xpReward,
        isProgressive: achievement.isProgressive,
        targetValue: achievement.targetValue,
        unlocked: userAchievement?.earnedAt ? true : false,
        progress: userAchievement?.progress || 0,
        earnedAt: userAchievement?.earnedAt,
      };
    });
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    throw error;
  }
}

export async function getUserStats() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    // Check and update user streak on dashboard load
    await UserService.checkAndUpdateStreak(userId);

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        lessonProgress: {
          where: { status: "completed" },
        },
        dailyStats: {
          where: {
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)), // Today
            },
          },
        },
      },
    });

    if (!user) throw new Error("User not found");

    const todayStats = user.dailyStats[0];
    const completedLessons = user.lessonProgress.length;

    // Calculate daily XP goal based on user's commitment and experience level
    let dailyXpGoal = 50; // Default goal

    if (user.dailyTimeCommitment) {
      switch (user.dailyTimeCommitment) {
        case "5-10":
          dailyXpGoal = 25;
          break;
        case "10-20":
          dailyXpGoal = 50;
          break;
        case "20-30":
          dailyXpGoal = 75;
          break;
        case "30+":
          dailyXpGoal = 100;
          break;
        default:
          dailyXpGoal = 50;
      }
    }

    // Adjust based on user level (higher levels need more XP)
    if (user.level > 10) {
      dailyXpGoal = Math.floor(dailyXpGoal * 1.5);
    } else if (user.level > 5) {
      dailyXpGoal = Math.floor(dailyXpGoal * 1.2);
    }

    return {
      level: user.level,
      totalXp: user.totalXp,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      hearts: user.hearts,
      completedLessons,
      todayXp: todayStats?.xpEarned || 0,
      todayLessons: todayStats?.lessonsCompleted || 0,
      dailyXpGoal,
      motivation: user.motivation,
      experience: user.experience,
      goals: user.goals,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
}

export async function getLeaderboard() {
  try {
    const leaderboard = await db.user.findMany({
      select: {
        id: true,
        displayName: true,
        imageUrl: true,
        level: true,
        totalXp: true,
        currentStreak: true,
      },
      where: {
        onboardingCompleted: true,
        totalXp: { gt: 0 },
      },
      orderBy: [{ totalXp: "desc" }, { currentStreak: "desc" }],
      take: 10,
    });

    return leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
      displayName: user.displayName || "Anonymous",
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
}

export async function completeLesson(lessonId: string, score: number) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get lesson details
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) throw new Error("Lesson not found");

    // Check if lesson was previously completed to determine XP multiplier
    const existingProgress = await db.userLessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
    });

    // If lesson was previously completed, user only gets 1/3 XP
    const wasCompleted = existingProgress?.status === "completed";
    const xpMultiplier = wasCompleted ? 1 / 3 : 1;
    const baseXp = Math.floor((score / 100) * lesson.xpReward);
    const xpGained = Math.floor(baseXp * xpMultiplier);
    const isPerfectScore = score === 100;

    if (existingProgress) {
      await db.userLessonProgress.update({
        where: { id: existingProgress.id },
        data: {
          status: "completed",
          progressPercentage: 100,
          bestScore: Math.max(existingProgress.bestScore || 0, score),
          attempts: existingProgress.attempts + 1,
          completedAt: new Date(),
        },
      });
    } else {
      await db.userLessonProgress.create({
        data: {
          userId: user.id,
          lessonId: lessonId,
          status: "completed",
          progressPercentage: 100,
          bestScore: score,
          attempts: 1,
          startedAt: new Date(),
          completedAt: new Date(),
        },
      });
    }

    // Check and update streak using the new service method
    const updatedUser = await UserService.updateStreakOnXpGain(userId);

    // Update user XP and level
    const newTotalXp = updatedUser.totalXp + xpGained;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    await db.user.update({
      where: { id: user.id },
      data: {
        totalXp: newTotalXp,
        level: newLevel,
      },
    });

    // Update daily stats
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
        xpEarned: { increment: xpGained },
        lessonsCompleted: { increment: 1 },
        timeSpent: { increment: lesson.estimatedMinutes * 60 },
        streakDay: updatedUser.currentStreak,
      },
      create: {
        userId: user.id,
        date: today,
        xpEarned: xpGained,
        lessonsCompleted: 1,
        timeSpent: lesson.estimatedMinutes * 60,
        streakDay: updatedUser.currentStreak,
      },
    });

    // Check and award achievements
    await checkAndAwardAchievements(user.id, {
      type: "lesson_completed",
      lessonId,
      score,
      isPerfectScore,
      newLevel: newLevel,
      newTotalXp: newTotalXp,
      category: lesson.category,
    });

    revalidatePath("/dashboard");

    return {
      xpGained,
      newLevel: newLevel,
      leveledUp: newLevel > user.level,
      newTotalXp,
    };
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error;
  }
}

async function checkAndAwardAchievements(
  userId: string,
  context: {
    type: string;
    lessonId?: string;
    score?: number;
    isPerfectScore?: boolean;
    newLevel?: number;
    newTotalXp?: number;
    category?: string;
  },
) {
  try {
    // Get current user progress
    const [userProgress, achievements] = await Promise.all([
      db.userLessonProgress.findMany({
        where: { userId, status: "completed" },
        include: { lesson: true },
      }),
      db.achievement.findMany({
        include: {
          userAchievements: {
            where: { userId },
          },
        },
      }),
    ]);

    const completedLessons = userProgress.length;
    const perfectScores = userProgress.filter(
      (p) => p.bestScore === 100,
    ).length;
    const categoryCounts = userProgress.reduce(
      (acc, p) => {
        acc[p.lesson.category] = (acc[p.lesson.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const achievementsToAward = [];

    for (const achievement of achievements) {
      const userAchievement = achievement.userAchievements[0];

      // Skip if already earned
      if (userAchievement?.earnedAt) continue;

      let shouldAward = false;
      let newProgress = userAchievement?.progress || 0;

      switch (achievement.key) {
        // Learning achievements
        case "first_lesson":
          shouldAward = completedLessons >= 1;
          break;
        case "lessons_5":
        case "lessons_10":
        case "lessons_25":
        case "lessons_50":
          newProgress = completedLessons;
          shouldAward = completedLessons >= (achievement.targetValue || 0);
          break;
        case "perfect_score":
        case "perfect_score_10":
          newProgress = perfectScores;
          shouldAward = perfectScores >= (achievement.targetValue || 0);
          break;
        case "complete_category_greetings":
          shouldAward = (categoryCounts["greetings"] || 0) >= 3; // Assuming 3 lessons per category
          break;
        case "complete_category_family":
          shouldAward = (categoryCounts["family"] || 0) >= 3;
          break;
        case "complete_category_numbers":
          shouldAward = (categoryCounts["numbers"] || 0) >= 3;
          break;

        // Progress achievements
        case "level_5":
        case "level_10":
        case "level_25":
          newProgress = context.newLevel || 0;
          shouldAward =
            (context.newLevel || 0) >= (achievement.targetValue || 0);
          break;
        case "xp_1000":
        case "xp_5000":
          newProgress = context.newTotalXp || 0;
          shouldAward =
            (context.newTotalXp || 0) >= (achievement.targetValue || 0);
          break;

        // Special achievements
        case "beta_tester":
          shouldAward = true; // Award to all users during beta
          break;
        case "early_bird":
          const currentHour = new Date().getHours();
          shouldAward = context.type === "lesson_completed" && currentHour < 8;
          break;
        case "night_owl":
          const currentHourNight = new Date().getHours();
          shouldAward =
            context.type === "lesson_completed" && currentHourNight >= 22;
          break;

        // Streak achievements
        case "streak_3":
        case "streak_7":
        case "streak_14":
        case "streak_30":
        case "streak_50":
        case "streak_100":
          // Get current user to check their streak
          const userForStreak = await db.user.findUnique({
            where: { id: userId },
          });
          if (userForStreak) {
            newProgress = userForStreak.currentStreak;
            shouldAward =
              userForStreak.currentStreak >= (achievement.targetValue || 0);
          }
          break;
      }

      if (
        shouldAward ||
        (achievement.isProgressive &&
          newProgress > (userAchievement?.progress || 0))
      ) {
        achievementsToAward.push({
          achievement,
          shouldAward,
          newProgress,
        });
      }
    }

    // Award achievements
    for (const {
      achievement,
      shouldAward,
      newProgress,
    } of achievementsToAward) {
      await db.userAchievement.upsert({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id,
          },
        },
        update: {
          progress: newProgress,
          earnedAt: shouldAward ? new Date() : null,
        },
        create: {
          userId,
          achievementId: achievement.id,
          progress: newProgress,
          earnedAt: shouldAward ? new Date() : null,
        },
      });

      // If achievement was earned, award XP
      if (shouldAward) {
        await db.user.update({
          where: { id: userId },
          data: {
            totalXp: { increment: achievement.xpReward },
          },
        });
      }
    }

    return achievementsToAward.filter((a) => a.shouldAward);
  } catch (error) {
    console.error("Error checking achievements:", error);
    return [];
  }
}
