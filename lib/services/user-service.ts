import { db } from "@/lib/db";
import type { User } from "../generated/prisma";

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

interface FriendshipWithUsers {
  userId: string;
  friendId: string;
  status: string;
  user: {
    id: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
    lastActiveAt: Date;
  };
  friend: {
    id: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
    lastActiveAt: Date;
  };
}

export class UserService {
  // Create or get user from database
  static async createOrGetUser(userData: CreateUserData): Promise<User> {
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: userData.clerkUserId },
    });

    if (existingUser) {
      return existingUser;
    }

    return await db.user.create({
      data: {
        clerkUserId: userData.clerkUserId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        displayName:
          userData.firstName || userData.email?.split("@")[0] || "Learner",
      },
    });
  }

  // Complete onboarding process
  static async completeOnboarding(
    clerkUserId: string,
    onboardingData: OnboardingData,
  ): Promise<User> {
    return await db.user.update({
      where: { clerkUserId },
      data: {
        onboardingCompleted: true,
        motivation: onboardingData.motivation,
        experience: onboardingData.experience,
        goals: onboardingData.goals,
        dailyTimeCommitment: onboardingData.dailyTimeCommitment,
      },
    });
  }

  // Get user by Clerk ID
  static async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { clerkUserId },
    });
  }

  // Update user XP and level
  static async updateUserXP(
    clerkUserId: string,
    xpGained: number,
  ): Promise<User> {
    const user = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newTotalXp = user.totalXp + xpGained;
    const newLevel = Math.floor(newTotalXp / 100) + 1; // 100 XP per level

    return await db.user.update({
      where: { clerkUserId },
      data: {
        totalXp: newTotalXp,
        level: newLevel,
        lastXpGainedAt: new Date(), // Track when user last gained XP
        lastActiveAt: new Date(),
      },
    });
  }

  // Check and update streak based on XP activity
  static async checkAndUpdateStreak(clerkUserId: string): Promise<User> {
    const user = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // If user has never gained XP, set streak to 1 (they're logged in)
    if (!user.lastXpGainedAt) {
      return await db.user.update({
        where: { clerkUserId },
        data: {
          currentStreak: 1,
          longestStreak: Math.max(user.longestStreak, 1),
          lastActiveAt: now,
        },
      });
    }

    // If it's been >= 24 hours since last XP gain, reset streak to 1
    if (user.lastXpGainedAt < twentyFourHoursAgo) {
      return await db.user.update({
        where: { clerkUserId },
        data: {
          currentStreak: 1,
          lastActiveAt: now,
        },
      });
    }

    // Otherwise, just update last active time and return current user
    return await db.user.update({
      where: { clerkUserId },
      data: {
        lastActiveAt: now,
      },
    });
  }

  // Update streak with daily stats logic (for lesson completion)
  static async updateStreakOnXpGain(clerkUserId: string): Promise<User> {
    const user = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user was active yesterday
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStats = await db.dailyStats.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: yesterday,
        },
      },
    });

    // Check today's activity (before this action)
    const todayStats = await db.dailyStats.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
    });

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

    return await db.user.update({
      where: { clerkUserId },
      data: {
        currentStreak: newStreak,
        longestStreak,
        lastActiveAt: new Date(),
        lastXpGainedAt: new Date(),
      },
    });
  }

  // Get leaderboard
  static async getLeaderboard(limit: number = 10) {
    return await db.user.findMany({
      select: {
        id: true,
        displayName: true,
        imageUrl: true,
        level: true,
        totalXp: true,
        currentStreak: true,
      },
      orderBy: [{ totalXp: "desc" }, { currentStreak: "desc" }],
      take: limit,
    });
  }

  // Get user's friends
  static async getUserFriends(clerkUserId: string) {
    const user = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const friendships = await db.friendship.findMany({
      where: {
        OR: [
          { userId: user.id, status: "accepted" },
          { friendId: user.id, status: "accepted" },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            imageUrl: true,
            level: true,
            currentStreak: true,
            lastActiveAt: true,
          },
        },
        friend: {
          select: {
            id: true,
            displayName: true,
            imageUrl: true,
            level: true,
            currentStreak: true,
            lastActiveAt: true,
          },
        },
      },
    });

    return friendships.map((friendship: FriendshipWithUsers) => {
      const friend =
        friendship.userId === user.id ? friendship.friend : friendship.user;
      return {
        ...friend,
        status: this.getUserOnlineStatus(friend.lastActiveAt),
      };
    });
  }

  // Helper to determine online status
  private static getUserOnlineStatus(lastActiveAt: Date): "online" | "offline" {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastActiveAt > fiveMinutesAgo ? "online" : "offline";
  }
}
