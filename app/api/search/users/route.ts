import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, friendships } from "@/lib/db/schema";
import { eq, or, and, notInArray, ilike, desc } from "drizzle-orm";
import { UserService } from "@/lib/services/user-service";

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (query.length < 2) {
      return NextResponse.json({ users: [] });
    }

    // Get current user to exclude from results
    const currentUser = await UserService.getUserByClerkId(clerkUserId);
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get existing friend relationships to exclude
    const existingFriendships = await db
      .select({
        userId: friendships.userId,
        friendId: friendships.friendId,
        status: friendships.status,
      })
      .from(friendships)
      .where(
        or(
          eq(friendships.userId, currentUser.id),
          eq(friendships.friendId, currentUser.id),
        ),
      );

    const excludeUserIds = new Set([currentUser.id]);
    existingFriendships.forEach((friendship) => {
      if (friendship.userId === currentUser.id) {
        excludeUserIds.add(friendship.friendId);
      } else {
        excludeUserIds.add(friendship.userId);
      }
    });

    // Search for users
    const searchResults = await db
      .select({
        id: users.id,
        clerkUserId: users.clerkUserId,
        displayName: users.displayName,
        firstName: users.firstName,
        lastName: users.lastName,
        imageUrl: users.imageUrl,
        level: users.level,
        currentStreak: users.currentStreak,
        lastActiveAt: users.lastActiveAt,
      })
      .from(users)
      .where(
        and(
          notInArray(users.id, Array.from(excludeUserIds)),
          or(
            ilike(users.displayName, `%${query}%`),
            ilike(users.firstName, `%${query}%`),
            ilike(users.lastName, `%${query}%`),
            ilike(users.email, `%${query}%`),
          ),
        ),
      )
      .orderBy(desc(users.level), desc(users.totalXp))
      .limit(10);

    return NextResponse.json({
      users: searchResults.map((user) => ({
        ...user,
        status: getOnlineStatus(user.lastActiveAt),
      })),
    });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "Failed to search users" },
      { status: 500 },
    );
  }
}

function getOnlineStatus(lastActiveAt: Date): "online" | "offline" {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return lastActiveAt > fiveMinutesAgo ? "online" : "offline";
}
