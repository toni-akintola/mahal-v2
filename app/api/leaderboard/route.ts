import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
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
      .where(eq(users.onboardingCompleted, true))
      .orderBy(desc(users.totalXp), desc(users.currentStreak))
      .limit(10);

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
