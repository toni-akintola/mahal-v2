import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserService } from "@/lib/services/user-service";

export async function GET() {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Try to get user from database first
    let user = await UserService.getUserByClerkId(userId);

    // If user doesn't exist, create them (fallback for webhook)
    if (!user) {
      console.log("User not found in database, creating:", userId);
      user = await UserService.createOrGetUser({
        clerkUserId: userId,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        firstName: clerkUser.firstName || undefined,
        lastName: clerkUser.lastName || undefined,
        imageUrl: clerkUser.imageUrl,
      });
    }

    // Check and update user streak on every visit
    const updatedUser = await UserService.checkAndUpdateStreak(userId);

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        clerkUserId: updatedUser.clerkUserId,
        displayName: updatedUser.displayName,
        level: updatedUser.level,
        totalXp: updatedUser.totalXp,
        currentStreak: updatedUser.currentStreak,
        longestStreak: updatedUser.longestStreak,
        hearts: updatedUser.hearts,
        onboardingCompleted: updatedUser.onboardingCompleted,
        lastActiveAt: updatedUser.lastActiveAt,
      },
    });
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 },
    );
  }
}
