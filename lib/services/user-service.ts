import { db } from "@/lib/db/index";
import { users, dailyStats, friendships } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import type { User } from "@/types/types";

export interface OnboardingData {
  motivation: string;
  experience: string;
  goals: string[];
  dailyTimeCommitment: string;
}

export interface CreateUserData {
  clerkUserId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export class UserService {
  // Create or get user from database
  static async createOrGetUser(userData: CreateUserData): Promise<User> {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userData.clerkUserId))
      .limit(1);

    if (existingUser.length > 0) {
      return existingUser[0] as User;
    }

    const result = await db
      .insert(users)
      .values({
        id: nanoid(),
        clerkUserId: userData.clerkUserId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        displayName:
          userData.firstName || userData.email?.split("@")[0] || "Learner",
      })
      .returning();

    return result[0] as User;
  }

  // Complete onboarding process
  static async completeOnboarding(
    clerkUserId: string,
    onboardingData: OnboardingData,
  ): Promise<User> {
    const result = await db
      .update(users)
      .set({
        onboardingCompleted: true,
        motivation: onboardingData.motivation,
        experience: onboardingData.experience,
        goals: onboardingData.goals,
        dailyTimeCommitment: onboardingData.dailyTimeCommitment,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning();

    return result[0] as User;
  }

  // Get user by Clerk ID
  static async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1);

    return result.length > 0 ? (result[0] as User) : null;
  }

  // Update user XP and level
  static async updateUserXP(
    clerkUserId: string,
    xpGained: number,
  ): Promise<User> {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1);

    if (userResult.length === 0) {
      throw new Error("User not found");
    }

    const user = userResult[0];
    const newTotalXp = user.totalXp + xpGained;
    const newLevel = Math.floor(newTotalXp / 100) + 1; // 100 XP per level

    const result = await db
      .update(users)
      .set({
        totalXp: newTotalXp,
        level: newLevel,
        lastXpGainedAt: new Date(),
        lastActiveAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning();

    return result[0] as User;
  }

  // Check and update streak based on XP activity
  static async checkAndUpdateStreak(clerkUserId: string): Promise<User> {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1);

    if (userResult.length === 0) {
      throw new Error("User not found");
    }

    const user = userResult[0];
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // If user has never gained XP, set streak to 1 (they're logged in)
    if (!user.lastXpGainedAt) {
      const result = await db
        .update(users)
        .set({
          currentStreak: 1,
          longestStreak: Math.max(user.longestStreak, 1),
          lastActiveAt: now,
          updatedAt: now,
        })
        .where(eq(users.clerkUserId, clerkUserId))
        .returning();
      return result[0] as User;
    }

    // If it's been >= 24 hours since last XP gain, reset streak to 1
    if (user.lastXpGainedAt < twentyFourHoursAgo) {
      const result = await db
        .update(users)
        .set({
          currentStreak: 1,
          lastActiveAt: now,
          updatedAt: now,
        })
        .where(eq(users.clerkUserId, clerkUserId))
        .returning();
      return result[0] as User;
    }

    // Otherwise, just update last active time and return current user
    const result = await db
      .update(users)
      .set({
        lastActiveAt: now,
        updatedAt: now,
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning();
    return result[0] as User;
  }

  // Update streak with daily stats logic (for lesson completion)
  static async updateStreakOnXpGain(clerkUserId: string): Promise<User> {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1);

    if (userResult.length === 0) {
      throw new Error("User not found");
    }

    const user = userResult[0];

    // Check if user was active yesterday
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStatsResult = await db
      .select()
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, user.id),
          eq(dailyStats.date, yesterday.toISOString().split("T")[0]),
        ),
      )
      .limit(1);

    const yesterdayStats =
      yesterdayStatsResult.length > 0 ? yesterdayStatsResult[0] : null;

    // Check today's activity (before this action)
    const todayStatsResult = await db
      .select()
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, user.id),
          eq(dailyStats.date, today.toISOString().split("T")[0]),
        ),
      )
      .limit(1);

    const todayStats = todayStatsResult.length > 0 ? todayStatsResult[0] : null;

    let newStreak = 1;
    if (todayStats && todayStats.xpEarned > 0) {
      // Already gained XP today, keep current streak
      newStreak = user.currentStreak;
    } else if (yesterdayStats && yesterdayStats.xpEarned > 0) {
      // Gained XP yesterday, increment streak
      newStreak = user.currentStreak + 1;
    } else {
      // First XP in streak or broke streak
      newStreak = 1;
    }

    const longestStreak = Math.max(user.longestStreak, newStreak);

    const result = await db
      .update(users)
      .set({
        currentStreak: newStreak,
        longestStreak,
        lastActiveAt: new Date(),
        lastXpGainedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning();

    return result[0] as User;
  }

  // Get leaderboard
  static async getLeaderboard(limit: number = 10) {
    const result = await db
      .select({
        id: users.id,
        displayName: users.displayName,
        imageUrl: users.imageUrl,
        level: users.level,
        totalXp: users.totalXp,
        currentStreak: users.currentStreak,
      })
      .from(users)
      .orderBy(desc(users.totalXp), desc(users.currentStreak))
      .limit(limit);

    return result;
  }

  // Get user's friends
  static async getUserFriends(clerkUserId: string) {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1);

    if (userResult.length === 0) {
      throw new Error("User not found");
    }

    const user = userResult[0];

    // Create aliases for the user table to perform self-joins
    const friendUser = alias(users, "friendUser");
    const requesterUser = alias(users, "requesterUser");

    // Get friendships where current user is the requester
    const sentFriendships = await db
      .select({
        id: friendUser.id,
        displayName: friendUser.displayName,
        imageUrl: friendUser.imageUrl,
        level: friendUser.level,
        currentStreak: friendUser.currentStreak,
        lastActiveAt: friendUser.lastActiveAt,
      })
      .from(friendships)
      .innerJoin(friendUser, eq(friendships.friendId, friendUser.id))
      .where(
        and(
          eq(friendships.userId, user.id),
          eq(friendships.status, "accepted"),
        ),
      );

    // Get friendships where current user is the receiver
    const receivedFriendships = await db
      .select({
        id: requesterUser.id,
        displayName: requesterUser.displayName,
        imageUrl: requesterUser.imageUrl,
        level: requesterUser.level,
        currentStreak: requesterUser.currentStreak,
        lastActiveAt: requesterUser.lastActiveAt,
      })
      .from(friendships)
      .innerJoin(requesterUser, eq(friendships.userId, requesterUser.id))
      .where(
        and(
          eq(friendships.friendId, user.id),
          eq(friendships.status, "accepted"),
        ),
      );

    // Combine and deduplicate friends
    const allFriends = [...sentFriendships, ...receivedFriendships];

    // Remove duplicates based on user ID
    const uniqueFriends = allFriends.filter(
      (friend, index, self) =>
        index === self.findIndex((f) => f.id === friend.id),
    );

    return uniqueFriends.map((friend) => ({
      ...friend,
      status: this.getUserOnlineStatus(friend.lastActiveAt),
    }));
  }

  // Helper to determine online status
  private static getUserOnlineStatus(lastActiveAt: Date): "online" | "offline" {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastActiveAt > fiveMinutesAgo ? "online" : "offline";
  }
}
