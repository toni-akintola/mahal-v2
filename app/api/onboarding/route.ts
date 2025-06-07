import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { motivation, experience, goals, dailyTime } = body;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    let user;
    if (existingUser.length > 0) {
      // Update existing user
      const result = await db
        .update(users)
        .set({
          onboardingCompleted: true,
          motivation,
          experience,
          goals,
          dailyTimeCommitment: dailyTime,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkUserId, userId))
        .returning();
      user = result[0];
    } else {
      // Create new user
      const result = await db
        .insert(users)
        .values({
          id: nanoid(),
          clerkUserId: userId,
          onboardingCompleted: true,
          motivation,
          experience,
          goals,
          dailyTimeCommitment: dailyTime,
        })
        .returning();
      user = result[0];
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 },
    );
  }
}
