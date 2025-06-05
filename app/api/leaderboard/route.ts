import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
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
      orderBy: [{ totalXp: "desc" }, { currentStreak: "desc" }],
      take: 10,
      where: {
        onboardingCompleted: true,
      },
    });

    // Add rank to each user
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    return NextResponse.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}
