"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  GameCard,
  GameCardContent,
  GameCardHeader,
  GameCardTitle,
} from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { XPCounter, StreakCounter } from "@/components/ui/game-counters";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserLessons } from "@/lib/actions/lesson-actions";
import {
  getUserAchievements,
  getUserStats,
  getLeaderboard,
} from "@/lib/actions/achievement-actions";
import type { Exercise } from "@/types/types";
import {
  Flame,
  Trophy,
  Check,
  Target,
  Award,
  BookOpen,
  Users,
  Crown,
  UserPlus,
  Star,
  Zap,
  Hash,
  Heart,
  Globe,
  Calendar,
  Moon,
  Sunrise,
  GraduationCap,
  CheckCircle,
  Clock,
  Lock,
  HelpCircle,
  Lightbulb,
  Volume2,
} from "lucide-react";
import { SocialDashboard } from "@/components/social/SocialDashboard";

// Types
interface UserLesson {
  id: number;
  title: string;
  description: string;
  exercises: Exercise[];
  completed: boolean;
  progress: number;
  bestScore: number;
  attempts: number;
  startedAt?: Date;
  completedAt?: Date;
}

interface UserAchievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  progress?: number;
  targetValue?: number | null;
  xpReward: number;
}

interface UserStats {
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  hearts: number;
  completedLessons: number;
  todayXp: number;
  todayLessons: number;
  dailyXpGoal: number;
  motivation?: string | null;
  experience?: string | null;
  goals?: string[];
}

interface LeaderboardEntry {
  rank: number;
  id: string;
  displayName: string;
  imageUrl?: string | null;
  level: number;
  totalXp: number;
  currentStreak: number;
}

// Clerk Avatar Component with gradient fallback
function ClerkAvatar({
  clerkUserId,
  displayName,
  className,
}: {
  clerkUserId: string;
  displayName: string;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const clerkImageUrl = `https://img.clerk.com/${clerkUserId}?width=128&height=128`;

  return (
    <Avatar className={className}>
      {!imageError && (
        <AvatarImage src={clerkImageUrl} onError={() => setImageError(true)} />
      )}
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-red-500 text-white font-semibold">
        {displayName[0]?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
}

// Helper function for motivation messages
function getMotivationMessage(motivation: string): string {
  switch (motivation) {
    case "heritage":
      return "Connecting with your Filipino heritage";
    case "travel":
      return "Preparing for your Philippines adventure";
    case "family":
      return "Building stronger family connections";
    case "work":
      return "Advancing your professional opportunities";
    case "academic":
      return "Exploring Filipino language and culture";
    default:
      return "Continue mastering Tagalog with interactive lessons";
  }
}

// Helper function for goal titles
function getGoalTitle(goalId: string): string {
  switch (goalId) {
    case "basic-conversation":
      return "Basic Conversation";
    case "fluency":
      return "Achieve Fluency";
    case "reading-writing":
      return "Reading & Writing";
    case "business-tagalog":
      return "Business Tagalog";
    case "cultural-understanding":
      return "Cultural Understanding";
    case "family-communication":
      return "Family Communication";
    default:
      return goalId;
  }
}

// Icon mapping for achievements
const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Hash: <Hash className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  Crown: <Crown className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
  UserPlus: <UserPlus className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Sunrise: <Sunrise className="w-6 h-6" />,
  Moon: <Moon className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  CheckCircle: <CheckCircle className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
};

export default function MahalDashboard() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [lessons, setLessons] = useState<UserLesson[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { isSignedIn } = useUser();

  const startLesson = (lesson: UserLesson) => {
    router.push(`/lesson/${lesson.id}`);
  };

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // Check if user has completed onboarding
    const checkOnboarding = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          if (!data.user.onboardingCompleted) {
            router.push("/onboarding");
            return;
          }

          // Load dashboard data
          await loadDashboardData();
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboarding();
  }, [isSignedIn, router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [lessonsData, achievementsData, statsData, leaderboardData] =
        await Promise.all([
          getUserLessons(),
          getUserAchievements(),
          getUserStats(),
          getLeaderboard(),
        ]);

      setLessons(lessonsData as UserLesson[]);
      setAchievements(achievementsData);
      setUserStats(statsData as UserStats);
      setLeaderboard(leaderboardData as LeaderboardEntry[]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userStats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            Loading your learning journey...
          </p>
        </div>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🇵🇭</span>
              </div>
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">Mahal</h1>
          </div>

          <div className="flex items-center gap-4">
            <StreakCounter value={userStats.currentStreak} />
            <XPCounter value={`${userStats.totalXp} XP`} />
            <Badge
              variant="outline"
              className="font-medium text-muted-foreground border-border"
            >
              Level {userStats.level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card rounded-2xl p-1 shadow-sm border border-border">
            <TabsTrigger
              value="lessons"
              className="flex items-center gap-2 rounded-xl"
            >
              <BookOpen className="w-4 h-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-2 rounded-xl"
            >
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="flex items-center gap-2 rounded-xl"
            >
              <Crown className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="flex items-center gap-2 rounded-xl"
            >
              <Users className="w-4 h-4" />
              Social
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="flex items-center gap-2 rounded-xl"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="mt-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Lessons */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-3xl font-semibold text-foreground mb-2">
                    Your Learning Journey
                  </h2>
                  {userStats.motivation && (
                    <p className="text-muted-foreground">
                      {getMotivationMessage(userStats.motivation)} • Level{" "}
                      {userStats.level}
                    </p>
                  )}
                  {!userStats.motivation && (
                    <p className="text-muted-foreground">
                      Continue mastering Tagalog with interactive lessons
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`${
                        lesson.completed || lesson.progress === 100
                          ? "p-[2px] bg-gradient-to-r from-green-500 to-green-600 rounded-2xl"
                          : lesson.progress > 0
                            ? ""
                            : "p-[2px] bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl"
                      }`}
                    >
                      <GameCard
                        variant="lesson"
                        interactive
                        className={`cursor-pointer ${
                          lesson.completed || lesson.progress === 100
                            ? "border-green-500 bg-background"
                            : lesson.progress > 0
                              ? "border-yellow-500"
                              : "border-transparent bg-background"
                        }`}
                        onClick={() =>
                          lesson.exercises.length > 0 && startLesson(lesson)
                        }
                      >
                        <GameCardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                                  lesson.completed || lesson.progress === 100
                                    ? "bg-green-500"
                                    : lesson.progress > 0
                                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                      : "bg-gradient-to-r from-blue-500 to-red-500"
                                }`}
                              >
                                {lesson.completed || lesson.progress === 100 ? (
                                  <Trophy className="w-8 h-8 text-white" />
                                ) : (
                                  <span className="text-white font-bold text-lg">
                                    {lesson.id}
                                  </span>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-xl text-foreground">
                                  {lesson.title}
                                </h3>
                                <p className="text-muted-foreground mt-1">
                                  {lesson.description}
                                </p>
                                {lesson.progress > 0 && (
                                  <div className="mt-2">
                                    <Progress
                                      value={lesson.progress}
                                      className="w-40 h-2"
                                    />
                                    <span className="text-sm text-muted-foreground mt-1">
                                      {lesson.progress}% complete
                                    </span>
                                  </div>
                                )}
                                {lesson.bestScore > 0 && (
                                  <p className="text-sm text-green-400 mt-1">
                                    Best score: {lesson.bestScore}%
                                  </p>
                                )}
                              </div>
                            </div>
                            {lesson.exercises.length > 0 && (
                              <GameButton
                                variant={lesson.completed ? "gold" : "primary"}
                                className="px-6 py-3 font-medium"
                              >
                                {lesson.completed || lesson.progress === 100
                                  ? "Review"
                                  : lesson.progress > 0
                                    ? "Continue"
                                    : "Start"}
                              </GameButton>
                            )}
                          </div>
                        </GameCardContent>
                      </GameCard>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Daily Goal */}
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="text-foreground flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      Daily Goal
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Today&apos;s XP
                        </span>
                        <span className="font-semibold text-foreground">
                          {userStats.todayXp} / {userStats.dailyXpGoal}
                        </span>
                      </div>
                      <Progress
                        value={
                          (userStats.todayXp / userStats.dailyXpGoal) * 100
                        }
                        className="h-3"
                      />
                      {userStats.todayXp >= userStats.dailyXpGoal ? (
                        <p className="text-sm text-green-400 font-medium">
                          Goal completed! 🎉
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {userStats.dailyXpGoal - userStats.todayXp} XP to
                          reach today&apos;s goal
                        </p>
                      )}
                    </div>
                  </GameCardContent>
                </GameCard>

                {/* Quick Stats */}
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="text-foreground">
                      Quick Stats
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Current Streak
                      </span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-red-400" />
                        <span className="font-semibold text-foreground">
                          {userStats.currentStreak} days
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total XP</span>
                      <span className="font-semibold text-foreground">
                        {userStats.totalXp}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Lessons Completed
                      </span>
                      <span className="font-semibold text-foreground">
                        {userStats.completedLessons}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Longest Streak
                      </span>
                      <span className="font-semibold text-foreground">
                        {userStats.longestStreak} days
                      </span>
                    </div>
                  </GameCardContent>
                </GameCard>

                {/* Goals Progress */}
                {userStats.goals && userStats.goals.length > 0 && (
                  <GameCard>
                    <GameCardHeader>
                      <GameCardTitle className="text-foreground flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        Your Goals
                      </GameCardTitle>
                    </GameCardHeader>
                    <GameCardContent className="space-y-3">
                      {userStats.goals.slice(0, 3).map((goal) => (
                        <div key={goal} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-foreground">
                            {getGoalTitle(goal)}
                          </span>
                        </div>
                      ))}
                      {userStats.goals.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{userStats.goals.length - 3} more goals
                        </p>
                      )}
                    </GameCardContent>
                  </GameCard>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Your Achievements
              </h2>
              <p className="text-muted-foreground">
                Track your progress and unlock new badges
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <GameCard
                  key={achievement.id}
                  className={`${
                    achievement.unlocked
                      ? "border-yellow-500 bg-yellow-500/10"
                      : ""
                  }`}
                >
                  <GameCardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        achievement.unlocked
                          ? "bg-yellow-500 text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {iconMap[achievement.icon] || (
                        <Award className="w-6 h-6" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {achievement.description}
                    </p>

                    {achievement.unlocked ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <Check className="w-3 h-3 mr-1" />
                        Unlocked • +{achievement.xpReward} XP
                      </Badge>
                    ) : achievement.targetValue &&
                      achievement.progress !== undefined ? (
                      <div className="space-y-2">
                        <Progress
                          value={
                            (achievement.progress / achievement.targetValue) *
                            100
                          }
                          className="h-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {achievement.progress} / {achievement.targetValue}
                        </span>
                      </div>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground border-border"
                      >
                        Locked
                      </Badge>
                    )}
                  </GameCardContent>
                </GameCard>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                Leaderboard
              </h2>
              <p className="text-muted-foreground">
                See how you rank against other learners
              </p>
            </div>

            <GameCard>
              <GameCardContent className="p-0">
                <div className="space-y-0">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-6 ${
                        index !== leaderboard.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            entry.rank === 1
                              ? "bg-yellow-500 text-black"
                              : entry.rank === 2
                                ? "bg-gray-400 text-white"
                                : entry.rank === 3
                                  ? "bg-orange-500 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {entry.rank}
                        </div>
                        <ClerkAvatar
                          clerkUserId={entry.id}
                          displayName={entry.displayName}
                          className="w-12 h-12"
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            {entry.displayName}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>Level {entry.level}</span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-red-400" />
                              {entry.currentStreak} day streak
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-foreground">
                          {entry.totalXp.toLocaleString()} XP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GameCardContent>
            </GameCard>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="mt-8">
            <SocialDashboard />
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                How to Learn with Mahal
              </h2>
              <p className="text-muted-foreground">
                Your complete guide to mastering Tagalog with interactive
                lessons
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* XP and Lesson Rules */}
              <div className="space-y-6">
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-blue-500" />
                      XP and Lesson Rules
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-4">
                    <div className="bg-blue-500/10 rounded-xl p-4 border-2 border-blue-500/20">
                      <h4 className="font-semibold text-foreground mb-2">
                        🎯 XP System
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                          •{" "}
                          <strong className="text-foreground">
                            First completion:
                          </strong>{" "}
                          Full XP based on your score
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-foreground">
                            Repeat lessons:
                          </strong>{" "}
                          Only 1/3 XP to encourage trying new content
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-foreground">Bonus XP:</strong>{" "}
                          Speed bonuses and streak multipliers available
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-500/10 rounded-xl p-4 border-2 border-yellow-500/20">
                      <h4 className="font-semibold text-foreground mb-2">
                        ❤️ Lives System
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                          •{" "}
                          <strong className="text-foreground">
                            2 lives per lesson:
                          </strong>{" "}
                          You can make mistakes and keep learning
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-foreground">
                            Failure is learning:
                          </strong>{" "}
                          If you lose both lives, review the material and try
                          again
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-foreground">
                            No penalty:
                          </strong>{" "}
                          Failed attempts don&apos;t affect your overall
                          progress
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-500/10 rounded-xl p-4 border-2 border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2">
                        🏆 Achievements
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                          •{" "}
                          <strong className="text-foreground">
                            Track progress:
                          </strong>{" "}
                          Unlock badges for completing lessons, streaks, and
                          more
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-foreground">Bonus XP:</strong>{" "}
                          Each achievement gives extra XP towards your level
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-foreground">Show off:</strong>{" "}
                          Display your accomplishments to friends
                        </li>
                      </ul>
                    </div>
                  </GameCardContent>
                </GameCard>
              </div>

              {/* Learning Strategy */}
              <div className="space-y-6">
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-500" />
                      Learning Strategy
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          📚 1. Start with the Guidebook
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Before jumping into exercises, read the key phrases,
                          vocabulary, and cultural notes. Use the audio buttons
                          to practice pronunciation.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          🎮 2. Practice Interactive Exercises
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Test your knowledge with various exercise types:
                          matching, translation, fill-in-the-blank, speaking,
                          and listening comprehension.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          🔄 3. Review and Repeat
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Come back to previous lessons for practice. While
                          you&apos;ll get less XP, repetition is key to language
                          retention.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          📈 4. Track Your Progress
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Monitor your daily XP goal, maintain your streak, and
                          celebrate achievements to stay motivated on your
                          language learning journey.
                        </p>
                      </div>
                    </div>
                  </GameCardContent>
                </GameCard>

                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2">
                      <Globe className="w-6 h-6 text-purple-500" />
                      Dashboard Features
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-foreground">
                            Lessons
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            Access all available lessons, ordered by your
                            experience level
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-foreground">
                            Achievements
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            View your unlocked badges and track progress on
                            goals
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Crown className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-foreground">
                            Leaderboard
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            See how you rank against other learners
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-foreground">
                            Social
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            Connect with friends and join study groups
                          </p>
                        </div>
                      </div>
                    </div>
                  </GameCardContent>
                </GameCard>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-8">
              <GameCard>
                <GameCardHeader>
                  <GameCardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-red-500" />
                    Quick Tips for Success
                  </GameCardTitle>
                </GameCardHeader>
                <GameCardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Stay Consistent
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Set a daily XP goal and maintain your streak. Even 10
                        minutes daily is better than long cramming sessions.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Volume2 className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Practice Speaking
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Use the audio features extensively. Click the sound
                        buttons and repeat the pronunciations out loud.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Learn Together
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Add friends and join study groups. Learning with others
                        increases motivation and retention.
                      </p>
                    </div>
                  </div>
                </GameCardContent>
              </GameCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
