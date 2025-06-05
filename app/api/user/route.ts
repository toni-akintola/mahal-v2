import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { UserService } from "@/lib/services/user-service";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check and update user streak on every visit
    const user = await UserService.checkAndUpdateStreak(userId);

    return NextResponse.json({
      user: {
        id: user.id,
        clerkUserId: user.clerkUserId,
        displayName: user.displayName,
        level: user.level,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        hearts: user.hearts,
        onboardingCompleted: user.onboardingCompleted,
        lastActiveAt: user.lastActiveAt,
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
