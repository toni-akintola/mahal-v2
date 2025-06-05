import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
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
    const existingFriendships = await db.friendship.findMany({
      where: {
        OR: [{ userId: currentUser.id }, { friendId: currentUser.id }],
      },
      select: {
        userId: true,
        friendId: true,
        status: true,
      },
    });

    const excludeUserIds = new Set([currentUser.id]);
    existingFriendships.forEach((friendship) => {
      if (friendship.userId === currentUser.id) {
        excludeUserIds.add(friendship.friendId);
      } else {
        excludeUserIds.add(friendship.userId);
      }
    });

    // Search for users
    const users = await db.user.findMany({
      where: {
        id: { notIn: Array.from(excludeUserIds) },
        OR: [
          { displayName: { contains: query, mode: "insensitive" } },
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        clerkUserId: true,
        displayName: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        level: true,
        currentStreak: true,
        lastActiveAt: true,
      },
      take: 10,
      orderBy: [{ level: "desc" }, { totalXp: "desc" }],
    });

    return NextResponse.json({
      users: users.map((user) => ({
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
