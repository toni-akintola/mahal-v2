import {
  pgTable,
  unique,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: text().primaryKey().notNull(),
    clerkUserId: text("clerk_user_id").notNull(),
    displayName: text("display_name"),
    email: text(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    imageUrl: text("image_url"),
    level: integer().default(1).notNull(),
    totalXp: integer("total_xp").default(0).notNull(),
    currentStreak: integer("current_streak").default(1).notNull(),
    longestStreak: integer("longest_streak").default(1).notNull(),
    hearts: integer().default(5).notNull(),
    onboardingCompleted: boolean("onboarding_completed")
      .default(false)
      .notNull(),
    motivation: text(),
    experience: text(),
    goals: text().array(),
    dailyTimeCommitment: text("daily_time_commitment"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    lastActiveAt: timestamp("last_active_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    lastXpGainedAt: timestamp("last_xp_gained_at", { mode: "string" }),
  },
  (table) => [unique("users_clerk_user_id_unique").on(table.clerkUserId)],
);

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    achievementId: text("achievement_id").notNull(),
    progress: integer().default(0).notNull(),
    earnedAt: timestamp("earned_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("user_achievements_user_id_achievement_id_unique").on(
      table.userId,
      table.achievementId,
    ),
  ],
);

export const lessons = pgTable("lessons", {
  id: text().primaryKey().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  difficultyLevel: text("difficulty_level").notNull(),
  orderIndex: integer("order_index").notNull(),
  category: text().notNull(),
  estimatedMinutes: integer("estimated_minutes").default(10).notNull(),
  xpReward: integer("xp_reward").default(10).notNull(),
  exercises: jsonb().notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const friendships = pgTable(
  "friendships",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    friendId: text("friend_id").notNull(),
    status: text().default("pending").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    acceptedAt: timestamp("accepted_at", { mode: "string" }),
  },
  (table) => [
    unique("friendships_user_id_friend_id_unique").on(
      table.userId,
      table.friendId,
    ),
  ],
);

export const studyGroupMembers = pgTable(
  "study_group_members",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    studyGroupId: text("study_group_id").notNull(),
    role: text().default("member").notNull(),
    joinedAt: timestamp("joined_at", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    unique("study_group_members_user_id_study_group_id_unique").on(
      table.userId,
      table.studyGroupId,
    ),
  ],
);

export const studyGroups = pgTable("study_groups", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  description: text(),
  isPublic: boolean("is_public").default(true).notNull(),
  maxMembers: integer("max_members").default(20).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const achievements = pgTable(
  "achievements",
  {
    id: text().primaryKey().notNull(),
    key: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    icon: text().notNull(),
    category: text().notNull(),
    targetValue: integer("target_value"),
    isProgressive: boolean("is_progressive").default(false).notNull(),
    xpReward: integer("xp_reward").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("achievements_key_unique").on(table.key)],
);

export const dailyStats = pgTable(
  "daily_stats",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    date: date().notNull(),
    xpEarned: integer("xp_earned").default(0).notNull(),
    lessonsCompleted: integer("lessons_completed").default(0).notNull(),
    timeSpent: integer("time_spent").default(0).notNull(),
    streakDay: integer("streak_day").default(0).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("daily_stats_user_id_date_unique").on(table.userId, table.date),
  ],
);

export const userLessonProgress = pgTable(
  "user_lesson_progress",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    lessonId: text("lesson_id").notNull(),
    status: text().default("pending").notNull(),
    progressPercentage: integer("progress_percentage").default(0).notNull(),
    attempts: integer().default(0).notNull(),
    bestScore: integer("best_score"),
    totalTimeSpent: integer("total_time_spent").default(0).notNull(),
    startedAt: timestamp("started_at", { mode: "string" }),
    completedAt: timestamp("completed_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("user_lesson_progress_user_id_lesson_id_unique").on(
      table.userId,
      table.lessonId,
    ),
  ],
);
