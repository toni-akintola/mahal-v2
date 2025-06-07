"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UserService } from "@/lib/services/user-service";
import {
  users,
  achievements,
  userAchievements,
  userLessonProgress,
  lessons,
  dailyStats,
} from "@/lib/db/schema";
import { eq, and, desc, gte, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

// Infer types from Drizzle schema
type UserStatsData = {
  user: typeof users.$inferSelect;
  completedLessons: number;
  todayXp: number;
  todayLessons: number;
  dailyXpGoal: number;
};

export async function getUserAchievements() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    // Get user from database
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId));
    const user = userResult[0];

    if (!user) throw new Error("User not found");

    // Get all achievements
    const allAchievements = await db
      .select()
      .from(achievements)
      .orderBy(achievements.createdAt);

    // Get user achievements for this user
    const userAchievementsList = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, user.id));

    // Create a map for quick lookup
    const userAchievementsMap = new Map(
      userAchievementsList.map((ua) => [ua.achievementId, ua]),
    );

    // Format achievements with progress data
    return allAchievements.map((achievement) => {
      const userAchievement = userAchievementsMap.get(achievement.id);
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

export async function getUserStats(): Promise<UserStatsData> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    // Check and update user streak on dashboard load
    await UserService.checkAndUpdateStreak(userId);

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId));
    const user = userResult[0];

    if (!user) throw new Error("User not found");

    // Get completed lesson progress
    const lessonProgressList = await db
      .select()
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, user.id),
          eq(userLessonProgress.status, "completed"),
        ),
      );

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayStatsList = await db
      .select()
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, user.id),
          eq(dailyStats.date, today.toISOString().split("T")[0]),
        ),
      );

    const todayStats = todayStatsList[0];
    const completedLessons = lessonProgressList.length;

    // Calculate daily XP goal based on user's time commitment from onboarding
    let dailyXpGoal = 50; // Default goal for 10-15 minute sessions

    if (user.dailyTimeCommitment) {
      switch (user.dailyTimeCommitment) {
        case "5-minutes":
          dailyXpGoal = 25; // Quick daily practice
          break;
        case "10-minutes":
          dailyXpGoal = 50; // Short but consistent learning
          break;
        case "15-minutes":
          dailyXpGoal = 75; // Balanced daily commitment
          break;
        case "30-minutes":
          dailyXpGoal = 100; // Serious about learning
          break;
        case "1-hour":
          dailyXpGoal = 150; // Intensive learning mode
          break;
        default:
          dailyXpGoal = 50; // Default fallback
      }
    }

    // Adjust based on user level (higher levels need more XP to stay challenged)
    if (user.level > 20) {
      dailyXpGoal = Math.floor(dailyXpGoal * 1.8);
    } else if (user.level > 15) {
      dailyXpGoal = Math.floor(dailyXpGoal * 1.6);
    } else if (user.level > 10) {
      dailyXpGoal = Math.floor(dailyXpGoal * 1.4);
    } else if (user.level > 5) {
      dailyXpGoal = Math.floor(dailyXpGoal * 1.2);
    }

    return {
      user,
      completedLessons,
      todayXp: todayStats?.xpEarned || 0,
      todayLessons: todayStats?.lessonsCompleted || 0,
      dailyXpGoal,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
}

export async function getLeaderboard() {
  try {
    const leaderboard = await db
      .select({
        id: users.id,
        displayName: users.displayName,
        imageUrl: users.imageUrl,
        level: users.level,
        totalXp: users.totalXp,
        currentStreak: users.currentStreak,
      })
      .from(users)
      .where(and(eq(users.onboardingCompleted, true), gte(users.totalXp, 1)))
      .orderBy(desc(users.totalXp), desc(users.currentStreak))
      .limit(10);

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

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId));
    const user = userResult[0];

    if (!user) throw new Error("User not found");

    // Get lesson details
    const lessonResult = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));
    const lesson = lessonResult[0];

    if (!lesson) throw new Error("Lesson not found");

    // Check if lesson was previously completed to determine XP multiplier
    const existingProgressResult = await db
      .select()
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, user.id),
          eq(userLessonProgress.lessonId, lessonId),
        ),
      );

    const existingProgress = existingProgressResult[0];

    // If lesson was previously completed, user only gets 1/3 XP
    const wasCompleted = existingProgress?.status === "completed";
    const xpMultiplier = wasCompleted ? 1 / 3 : 1;
    const baseXp = Math.floor((score / 100) * lesson.xpReward);
    const xpGained = Math.floor(baseXp * xpMultiplier);
    const isPerfectScore = score === 100;

    if (existingProgress) {
      await db
        .update(userLessonProgress)
        .set({
          status: "completed",
          progressPercentage: 100,
          bestScore: Math.max(existingProgress.bestScore || 0, score),
          attempts: existingProgress.attempts + 1,
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(userLessonProgress.id, existingProgress.id));
    } else {
      await db.insert(userLessonProgress).values({
        id: nanoid(),
        userId: user.id,
        lessonId: lessonId,
        status: "completed",
        progressPercentage: 100,
        bestScore: score,
        attempts: 1,
        startedAt: new Date(),
        completedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Check and update streak using the new service method
    const updatedUser = await UserService.updateStreakOnXpGain(userId);

    // Update user XP and level
    const newTotalXp = updatedUser.totalXp + xpGained;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    await db
      .update(users)
      .set({
        totalXp: newTotalXp,
        level: newLevel,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayDateString = today.toISOString().split("T")[0];

    // Check if daily stats exist for today
    const existingDailyStatsResult = await db
      .select()
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, user.id),
          eq(dailyStats.date, todayDateString),
        ),
      );

    const existingDailyStats = existingDailyStatsResult[0];

    if (existingDailyStats) {
      await db
        .update(dailyStats)
        .set({
          xpEarned: existingDailyStats.xpEarned + xpGained,
          lessonsCompleted: existingDailyStats.lessonsCompleted + 1,
          timeSpent:
            existingDailyStats.timeSpent + lesson.estimatedMinutes * 60,
          streakDay: updatedUser.currentStreak,
          updatedAt: new Date(),
        })
        .where(eq(dailyStats.id, existingDailyStats.id));
    } else {
      await db.insert(dailyStats).values({
        id: nanoid(),
        userId: user.id,
        date: todayDateString,
        xpEarned: xpGained,
        lessonsCompleted: 1,
        timeSpent: lesson.estimatedMinutes * 60,
        streakDay: updatedUser.currentStreak,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

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
    // Get current user progress with lessons
    const userProgressWithLessons = await db
      .select({
        progressId: userLessonProgress.id,
        bestScore: userLessonProgress.bestScore,
        category: lessons.category,
      })
      .from(userLessonProgress)
      .innerJoin(lessons, eq(userLessonProgress.lessonId, lessons.id))
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.status, "completed"),
        ),
      );

    // Get all achievements
    const allAchievements = await db.select().from(achievements);

    // Get user achievements for this user
    const userAchievementsList = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

    // Create a map for quick lookup
    const userAchievementsMap = new Map(
      userAchievementsList.map((ua) => [ua.achievementId, ua]),
    );

    const completedLessons = userProgressWithLessons.length;
    const perfectScores = userProgressWithLessons.filter(
      (p) => p.bestScore === 100,
    ).length;
    const categoryCounts = userProgressWithLessons.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const achievementsToAward = [];

    for (const achievement of allAchievements) {
      const userAchievement = userAchievementsMap.get(achievement.id);

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
          const userForStreakResult = await db
            .select({ currentStreak: users.currentStreak })
            .from(users)
            .where(eq(users.id, userId));
          const userForStreak = userForStreakResult[0];
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
      const existingUserAchievement = userAchievementsMap.get(achievement.id);

      if (existingUserAchievement) {
        // Update existing user achievement
        await db
          .update(userAchievements)
          .set({
            progress: newProgress,
            earnedAt: shouldAward ? new Date() : null,
          })
          .where(eq(userAchievements.id, existingUserAchievement.id));
      } else {
        // Create new user achievement
        await db.insert(userAchievements).values({
          id: nanoid(),
          userId,
          achievementId: achievement.id,
          progress: newProgress,
          earnedAt: shouldAward ? new Date() : null,
          createdAt: new Date(),
        });
      }

      // If achievement was earned, award XP
      if (shouldAward) {
        await db
          .update(users)
          .set({
            totalXp: sql`${users.totalXp} + ${achievement.xpReward}`,
            updatedAt: new Date(),
          })
          .where(eq(users.id, userId));
      }
    }

    return achievementsToAward.filter((a) => a.shouldAward);
  } catch (error) {
    console.error("Error checking achievements:", error);
    return [];
  }
}
