export type Lesson = {
  id: number;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  category?: string;
  guidebook: Guidebook;
  exercises: Exercise[];
};

export type Guidebook = {
  keyPhrases: {
    tagalog: string;
    english: string;
    pronunciation: string;
  }[];
  vocabulary: {
    word: string;
    meaning: string;
    pronunciation: string;
  }[];
  tips: string[];
  culturalNotes: string;
};

export type Exercise = {
  type:
    | "translate"
    | "multipleChoice"
    | "fillBlank"
    | "match"
    | "speaking"
    | "listening";
  question: string;
  answer?: string;
  options?: string[];
  hint?: string;
  pairs?: { tagalog: string; english: string }[];
  text?: string;
  wordBank?: string[];
  xp: number;
};

export type MatchExercise = {
  type: "match";
  pairs: { tagalog: string; english: string }[];
};

// Database types derived from Prisma schema
export interface User {
  id: string;
  clerkUserId: string;
  displayName: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  hearts: number;
  onboardingCompleted: boolean;
  motivation: string | null;
  experience: string | null;
  goals: string[];
  dailyTimeCommitment: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  lastXpGainedAt: Date | null;
}

export interface DbLesson {
  id: string;
  title: string;
  description: string;
  difficultyLevel: string;
  orderIndex: number;
  category: string;
  estimatedMinutes: number;
  xpReward: number;
  exercises: unknown; // JSON field
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: string;
  progressPercentage: number;
  attempts: number;
  bestScore: number | null;
  totalTimeSpent: number;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  targetValue: number | null;
  isProgressive: boolean;
  xpReward: number;
  isActive: boolean;
  createdAt: Date;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  progress: number;
  earnedAt: Date | null;
  createdAt: Date;
}

export interface DailyStats {
  id: string;
  userId: string;
  date: Date;
  xpEarned: number;
  lessonsCompleted: number;
  timeSpent: number;
  streakDay: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  maxMembers: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyGroupMember {
  id: string;
  userId: string;
  studyGroupId: string;
  role: string;
  joinedAt: Date;
}

// Extended types for API responses with relations
export interface FriendRequestUser {
  id: string;
  clerkUserId: string;
  displayName: string | null;
  imageUrl: string | null;
  level: number;
  currentStreak: number;
  lastActiveAt: Date;
}

export interface FriendRequest {
  id: string;
  user: FriendRequestUser;
  createdAt: Date;
}

export interface StudyGroupWithMembers extends StudyGroup {
  members: Array<{
    user: {
      id: string;
      displayName: string | null;
      imageUrl: string | null;
      level: number;
    };
    role: string;
    joinedAt: Date;
  }>;
}

export interface StudyGroupMembershipWithGroup {
  id: string;
  role: string;
  joinedAt: Date;
  studyGroup: StudyGroupWithMembers;
}

// Custom interfaces for database returns
export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt: Date;
  acceptedAt: Date | null;
  user: {
    id: string;
    clerkUserId: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
    lastActiveAt: Date;
  };
  friend: {
    id: string;
    clerkUserId: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
    lastActiveAt: Date;
  };
}
