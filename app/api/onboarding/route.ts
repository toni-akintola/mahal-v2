import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { motivation, experience, goals, dailyTime } = body;

    // Create or update user with onboarding data
    const user = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        onboardingCompleted: true,
        motivation,
        experience,
        goals,
        dailyTimeCommitment: dailyTime,
      },
      create: {
        clerkUserId: userId,
        onboardingCompleted: true,
        motivation,
        experience,
        goals,
        dailyTimeCommitment: dailyTime,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 },
    );
  }
}
