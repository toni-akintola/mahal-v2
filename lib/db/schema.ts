import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  date,
  jsonb,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User profile extending Clerk authentication
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  displayName: text("display_name"),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),

  // Learning stats
  level: integer("level").notNull().default(1),
  totalXp: integer("total_xp").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(1),
  longestStreak: integer("longest_streak").notNull().default(1),
  hearts: integer("hearts").notNull().default(5),

  // Onboarding data
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  motivation: text("motivation"),
  experience: text("experience"),
  goals: text("goals").array(), // Array of goal IDs
  dailyTimeCommitment: text("daily_time_commitment"),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  lastActiveAt: timestamp("last_active_at").notNull().defaultNow(),
  lastXpGainedAt: timestamp("last_xp_gained_at"),
});

// Lesson structure
export const lessons = pgTable("lessons", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficultyLevel: text("difficulty_level").notNull(), // beginner, intermediate, advanced
  orderIndex: integer("order_index").notNull(),
  category: text("category").notNull(), // greetings, family, numbers, etc.
  estimatedMinutes: integer("estimated_minutes").notNull().default(10),
  xpReward: integer("xp_reward").notNull().default(10),

  // Lesson content (JSONB)
  exercises: jsonb("exercises").notNull(), // Array of exercise objects

  // Metadata
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Track user progress through lessons
export const userLessonProgress = pgTable(
  "user_lesson_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    lessonId: text("lesson_id").notNull(),

    status: text("status").notNull().default("pending"), // pending, in_progress, completed
    progressPercentage: integer("progress_percentage").notNull().default(0),
    attempts: integer("attempts").notNull().default(0),
    bestScore: integer("best_score"),
    totalTimeSpent: integer("total_time_spent").notNull().default(0), // in seconds

    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userLessonUnique: unique().on(table.userId, table.lessonId),
    };
  },
);

// Achievement system
export const achievements = pgTable("achievements", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(), // unique identifier like "first_lesson", "streak_7"
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // icon name or emoji
  category: text("category").notNull(), // learning, social, streak, etc.

  // Achievement criteria
  targetValue: integer("target_value"), // for progressive achievements
  isProgressive: boolean("is_progressive").notNull().default(false),

  // Rewards
  xpReward: integer("xp_reward").notNull().default(0),

  // Metadata
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Track which users have earned achievements
export const userAchievements = pgTable(
  "user_achievements",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    achievementId: text("achievement_id").notNull(),

    progress: integer("progress").notNull().default(0), // for progressive achievements
    earnedAt: timestamp("earned_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userAchievementUnique: unique().on(table.userId, table.achievementId),
    };
  },
);

// Track daily activity for streaks and stats
export const dailyStats = pgTable(
  "daily_stats",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    date: date("date").notNull(),

    xpEarned: integer("xp_earned").notNull().default(0),
    lessonsCompleted: integer("lessons_completed").notNull().default(0),
    timeSpent: integer("time_spent").notNull().default(0), // in seconds
    streakDay: integer("streak_day").notNull().default(0), // day number in current streak

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userDateUnique: unique().on(table.userId, table.date),
    };
  },
);

// Friendship system
export const friendships = pgTable(
  "friendships",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    friendId: text("friend_id").notNull(),

    status: text("status").notNull().default("pending"), // pending, accepted, blocked
    createdAt: timestamp("created_at").notNull().defaultNow(),
    acceptedAt: timestamp("accepted_at"),
  },
  (table) => {
    return {
      userFriendUnique: unique().on(table.userId, table.friendId),
    };
  },
);

// Study groups for collaborative learning
export const studyGroups = pgTable("study_groups", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").notNull().default(true),
  maxMembers: integer("max_members").notNull().default(20),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Study group membership
export const studyGroupMembers = pgTable(
  "study_group_members",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    studyGroupId: text("study_group_id").notNull(),

    role: text("role").notNull().default("member"), // member, moderator, admin
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userStudyGroupUnique: unique().on(table.userId, table.studyGroupId),
    };
  },
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  lessonProgress: many(userLessonProgress),
  achievements: many(userAchievements),
  dailyStats: many(dailyStats),
  sentFriendships: many(friendships, { relationName: "userFriendships" }),
  receivedFriendships: many(friendships, { relationName: "friendFriendships" }),
  studyGroupMemberships: many(studyGroupMembers),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  userProgress: many(userLessonProgress),
}));

export const userLessonProgressRelations = relations(
  userLessonProgress,
  ({ one }) => ({
    user: one(users, {
      fields: [userLessonProgress.userId],
      references: [users.id],
    }),
    lesson: one(lessons, {
      fields: [userLessonProgress.lessonId],
      references: [lessons.id],
    }),
  }),
);

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(
  userAchievements,
  ({ one }) => ({
    user: one(users, {
      fields: [userAchievements.userId],
      references: [users.id],
    }),
    achievement: one(achievements, {
      fields: [userAchievements.achievementId],
      references: [achievements.id],
    }),
  }),
);

export const dailyStatsRelations = relations(dailyStats, ({ one }) => ({
  user: one(users, {
    fields: [dailyStats.userId],
    references: [users.id],
  }),
}));

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  user: one(users, {
    fields: [friendships.userId],
    references: [users.id],
    relationName: "userFriendships",
  }),
  friend: one(users, {
    fields: [friendships.friendId],
    references: [users.id],
    relationName: "friendFriendships",
  }),
}));

export const studyGroupsRelations = relations(studyGroups, ({ many }) => ({
  members: many(studyGroupMembers),
}));

export const studyGroupMembersRelations = relations(
  studyGroupMembers,
  ({ one }) => ({
    user: one(users, {
      fields: [studyGroupMembers.userId],
      references: [users.id],
    }),
    studyGroup: one(studyGroups, {
      fields: [studyGroupMembers.studyGroupId],
      references: [studyGroups.id],
    }),
  }),
);
