"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  GameCard,
  GameCardContent,
  GameCardHeader,
  GameCardTitle,
} from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { lessons } from "@/data/lessons";
import { getUserLessons } from "@/lib/actions/lesson-actions";
import { completeLesson } from "@/lib/actions/achievement-actions";
import { useTTS } from "@/lib/hooks/use-tts";
import { ExerciseEngine } from "@/components/exercises/ExerciseEngine";
import type { Exercise } from "@/types/types";
import {
  ArrowLeft,
  Trophy,
  Star,
  BookOpen,
  Play,
  BarChart,
  Volume2,
  Lightbulb,
  Globe,
  Loader2,
} from "lucide-react";

// Interface for lesson with user progress data
interface LessonWithProgress {
  id: number;
  title: string;
  description: string;
  category?: string;
  guidebook: {
    keyPhrases: Array<{
      tagalog: string;
      english: string;
      pronunciation: string;
    }>;
    vocabulary: Array<{
      word: string;
      meaning: string;
      pronunciation: string;
    }>;
    tips: string[];
    culturalNotes: string;
  };
  exercises: Exercise[];
  completed: boolean;
  progress: number;
  bestScore: number;
  attempts: number;
  startedAt?: Date;
  completedAt?: Date;
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [activeTab, setActiveTab] = useState("guidebook");
  const [showExercises, setShowExercises] = useState(false);
  const [lesson, setLesson] = useState<LessonWithProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const { speak, isLoading: ttsLoading, error: ttsError } = useTTS();

  // Load lesson data with user progress
  useEffect(() => {
    const loadLessonData = async () => {
      try {
        const userLessons = await getUserLessons();
        const userLesson = userLessons.find(
          (l) => l.id.toString() === lessonId,
        );

        // If not found in user lessons (due to reordering), fall back to static data
        if (!userLesson) {
          const staticLesson = lessons.find(
            (l) => l.id.toString() === lessonId,
          );
          setLesson(
            staticLesson
              ? {
                  ...staticLesson,
                  progress: 0,
                  completed: false,
                  bestScore: 0,
                  attempts: 0,
                }
              : null,
          );
        } else {
          setLesson(userLesson as LessonWithProgress);
        }
      } catch (error) {
        console.error("Error loading lesson data:", error);
        // Fallback to static data
        const staticLesson = lessons.find((l) => l.id.toString() === lessonId);
        setLesson(
          staticLesson
            ? {
                ...staticLesson,
                progress: 0,
                completed: false,
                bestScore: 0,
                attempts: 0,
              }
            : null,
        );
      } finally {
        setLoading(false);
      }
    };

    loadLessonData();
  }, [lessonId]);

  const SoundButton = ({
    text,
    className = "",
    size = "default",
  }: {
    text: string;
    className?: string;
    size?: "sm" | "default";
  }) => {
    const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

    return (
      <GameButton
        variant="ghost"
        className={`p-2 ${className}`}
        onClick={() => speak(text)}
        disabled={ttsLoading}
      >
        {ttsLoading ? (
          <Loader2 className={`${iconSize} animate-spin`} />
        ) : (
          <Volume2 className={iconSize} />
        )}
      </GameButton>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Lesson Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The lesson you&apos;re looking for doesn&apos;t exist.
          </p>
          <GameButton onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </GameButton>
        </div>
      </div>
    );
  }

  const handleCompleteLesson = async (finalScore: number) => {
    try {
      setIsCompleting(true);

      const result = await completeLesson(lessonId, finalScore);

      setScore(finalScore);
      setXpGained(result.xpGained);
      setLeveledUp(result.leveledUp);
      setCompleted(true);
    } catch (error) {
      console.error("Error completing lesson:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleExerciseComplete = (finalScore: number, xpEarned: number) => {
    setShowExercises(false);
    setXpGained(xpEarned);
    handleCompleteLesson(finalScore);
  };

  const handleExerciseExit = () => {
    setShowExercises(false);
    setActiveTab("practice");
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <GameCard className="w-full max-w-md mx-auto">
          <GameCardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Lesson Complete!
            </h1>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
              Great job on finishing &quot;{lesson.title}&quot;
            </p>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm md:text-base">
                  Score:
                </span>
                <span className="font-bold text-foreground text-sm md:text-base">
                  {score}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm md:text-base">
                  XP Earned:
                </span>
                <span className="font-bold text-blue-500 text-sm md:text-base">
                  +{xpGained} XP
                </span>
              </div>
              {leveledUp && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Star className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-sm md:text-base">
                      Level Up!
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <GameButton
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="flex-1"
              >
                Dashboard
              </GameButton>
              <GameButton
                variant="primary"
                onClick={() => setCompleted(false)}
                className="flex-1"
              >
                Try Again
              </GameButton>
            </div>
          </GameCardContent>
        </GameCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 md:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <GameButton
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="p-1.5 md:p-2 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </GameButton>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-semibold text-foreground truncate">
                {lesson.title}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                {lesson.description}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="font-medium text-xs md:text-sm flex-shrink-0 ml-2"
          >
            <span className="hidden sm:inline">Lesson </span>
            <span className="sm:hidden">L</span>
            {lesson.id}
          </Badge>
        </div>
      </div>

      {/* TTS Error Display */}
      {ttsError && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
            <p className="text-red-400 text-sm">Audio Error: {ttsError}</p>
          </div>
        </div>
      )}

      {/* Lesson Content */}
      {!showExercises && (
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full h-full grid-cols-3 mb-6 md:mb-8 bg-card border-4 border-border rounded-2xl p-2 md:p-3">
              <TabsTrigger
                value="guidebook"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-xl font-bold text-sm md:text-lg py-2 md:py-4 px-3 md:px-6"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Guidebook</span>
                <span className="sm:hidden">Guide</span>
              </TabsTrigger>
              <TabsTrigger
                value="practice"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-xl font-bold text-sm md:text-lg py-2 md:py-4 px-3 md:px-6"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Practice</span>
                <span className="sm:hidden">Play</span>
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-xl font-bold text-sm md:text-lg py-2 md:py-4 px-3 md:px-6"
              >
                <BarChart className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Progress</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guidebook" className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Key Phrases */}
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                      Key Phrases
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-3 md:space-y-4">
                    {lesson.guidebook.keyPhrases.map((phrase, index) => (
                      <div
                        key={index}
                        className="bg-muted/30 rounded-xl p-3 md:p-4 border-2 border-border"
                      >
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <span className="text-lg md:text-xl font-bold text-foreground flex-1">
                            {phrase.tagalog}
                          </span>
                          <SoundButton
                            text={phrase.tagalog}
                            className="flex-shrink-0"
                          />
                        </div>
                        <p className="text-muted-foreground mb-1 text-sm md:text-base">
                          {phrase.english}
                        </p>
                        <p className="text-xs md:text-sm text-blue-400 font-mono">
                          /{phrase.pronunciation}/
                        </p>
                      </div>
                    ))}
                  </GameCardContent>
                </GameCard>

                {/* Vocabulary */}
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                      Vocabulary
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-2 md:space-y-3">
                    {lesson.guidebook.vocabulary.map((word, index) => (
                      <div
                        key={index}
                        className="bg-muted/30 rounded-xl p-2.5 md:p-3 border-2 border-border"
                      >
                        <div className="flex justify-between items-center mb-1 gap-2">
                          <span className="font-bold text-foreground text-sm md:text-base flex-1">
                            {word.word}
                          </span>
                          <SoundButton
                            text={word.word}
                            className="p-1 flex-shrink-0"
                            size="sm"
                          />
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">
                          {word.meaning}
                        </p>
                        <p className="text-xs text-blue-400 font-mono">
                          /{word.pronunciation}/
                        </p>
                      </div>
                    ))}
                  </GameCardContent>
                </GameCard>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Tips */}
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-500" />
                      Learning Tips
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent>
                    <ul className="space-y-3">
                      {lesson.guidebook.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-xl border-2 border-yellow-500/20"
                        >
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </GameCardContent>
                </GameCard>

                {/* Cultural Notes */}
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle className="flex items-center gap-2">
                      <Globe className="w-6 h-6 text-purple-500" />
                      Cultural Context
                    </GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent>
                    <div className="bg-purple-500/10 rounded-xl p-4 border-2 border-purple-500/20">
                      <p className="text-foreground leading-relaxed">
                        {lesson.guidebook.culturalNotes}
                      </p>
                    </div>
                  </GameCardContent>
                </GameCard>
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <GameCard>
                <GameCardHeader>
                  <GameCardTitle>Interactive Practice</GameCardTitle>
                </GameCardHeader>
                <GameCardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Ready to Practice?
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Test your knowledge with {lesson.exercises.length}{" "}
                        interactive exercises
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                      <h3 className="font-semibold text-foreground mb-4">
                        Exercise Types in This Lesson
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Array.from(
                          new Set(lesson.exercises.map((ex) => ex.type)),
                        ).map((type) => (
                          <Badge
                            key={type}
                            variant="outline"
                            className="justify-center py-2 capitalize"
                          >
                            {type.replace(/([A-Z])/g, " $1").trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">
                        Start Practice Session
                      </h3>
                      <GameButton
                        variant="primary"
                        onClick={() => setShowExercises(true)}
                        className="text-lg px-8 py-4"
                      >
                        Begin Exercises
                      </GameButton>

                      <div className="mt-8">
                        {isCompleting && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Completing lesson and checking achievements...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </GameCardContent>
              </GameCard>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle>Lesson Statistics</GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-bold text-foreground">
                        {lesson.progress}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">
                        Total Exercises
                      </span>
                      <span className="font-bold text-foreground">
                        {lesson.exercises.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">
                        Total XP Available
                      </span>
                      <span className="font-bold text-blue-500">
                        {lesson.exercises.reduce((sum, ex) => sum + ex.xp, 0)}{" "}
                        XP
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant={lesson.completed ? "default" : "outline"}>
                        {lesson.completed ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </GameCardContent>
                </GameCard>

                <GameCard>
                  <GameCardHeader>
                    <GameCardTitle>Exercise Breakdown</GameCardTitle>
                  </GameCardHeader>
                  <GameCardContent className="space-y-3">
                    {lesson.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-muted/30 rounded-xl"
                      >
                        <div>
                          <span className="font-medium text-foreground capitalize">
                            {exercise.type.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <p className="text-sm text-muted-foreground truncate max-w-48">
                            {exercise.question}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {exercise.xp} XP
                        </Badge>
                      </div>
                    ))}
                  </GameCardContent>
                </GameCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Exercise Content */}
      {showExercises && (
        <ExerciseEngine
          exercises={lesson.exercises}
          lessonId={lessonId}
          onComplete={handleExerciseComplete}
          onExit={handleExerciseExit}
        />
      )}
    </div>
  );
}
