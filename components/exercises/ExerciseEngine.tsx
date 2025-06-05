"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Exercise } from "@/utils/types";
import {
  GameCard,
  GameCardContent,
  GameCardHeader,
  GameCardTitle,
} from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { updateExerciseProgress } from "@/lib/actions/lesson-actions";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Star,
  Heart,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { TranslateExercise } from "./TranslateExercise";
import { MultipleChoiceExercise } from "./MultipleChoiceExercise";
import { FillBlankExercise } from "./FillBlankExercise";
import { MatchExercise } from "./MatchExercise";
import { SpeakingExercise } from "./SpeakingExercise";
import { ListeningExercise } from "./ListeningExercise";

interface ExerciseEngineProps {
  exercises: Exercise[];
  lessonId: string;
  onComplete: (score: number, xpEarned: number) => void;
  onExit: () => void;
}

interface ExerciseResult {
  exerciseIndex: number;
  correct: boolean;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  timeSpent: number;
  xpEarned: number;
}

export function ExerciseEngine({
  exercises,
  lessonId,
  onComplete,
  onExit,
}: ExerciseEngineProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<ExerciseResult | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [lives, setLives] = useState(2); // Changed from hearts to lives
  const [streak, setStreak] = useState(0);
  const [showFailureDialog, setShowFailureDialog] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentExerciseIndex]);

  const handleExerciseSubmit = useCallback(
    async (userAnswer: string | string[], isCorrect: boolean) => {
      const timeSpent = Date.now() - startTime;
      const correctAnswer = getCorrectAnswer(currentExercise);

      // Calculate XP based on correctness, time, and streak
      let xp = currentExercise.xp;
      if (isCorrect) {
        xp += Math.floor(streak * 0.5); // Bonus XP for streak
        if (timeSpent < 10000) xp += 2; // Speed bonus
        setStreak(streak + 1);
      } else {
        xp = Math.floor(xp * 0.3); // Partial XP for incorrect answers
        setStreak(0);
        setLives(Math.max(0, lives - 1)); // Lose a life
      }

      const result: ExerciseResult = {
        exerciseIndex: currentExerciseIndex,
        correct: isCorrect,
        userAnswer,
        correctAnswer,
        timeSpent,
        xpEarned: xp,
      };

      setResults((prev) => [...prev, result]);
      setLastResult(result);
      setShowFeedback(true);

      // Update progress and XP in real-time
      try {
        await updateExerciseProgress(
          lessonId,
          isCorrect,
          xp,
          currentExerciseIndex,
          exercises.length,
        );
      } catch (error) {
        console.error("Failed to update progress:", error);
      }

      // Check if out of lives
      if (!isCorrect && lives <= 1) {
        setTimeout(() => {
          setShowFailureDialog(true);
        }, 2000);
        return;
      }

      // Auto-advance after showing feedback
      setTimeout(() => {
        setShowFeedback(false);
        if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
          // Exercise complete
          const totalScore = Math.round(
            ((results.filter((r) => r.correct).length + (isCorrect ? 1 : 0)) /
              exercises.length) *
              100,
          );
          const totalXP = results.reduce((sum, r) => sum + r.xpEarned, 0) + xp;
          onComplete(totalScore, totalXP);
        }
      }, 2000);
    },
    [
      currentExercise,
      currentExerciseIndex,
      exercises.length,
      results,
      startTime,
      streak,
      lives,
      lessonId,
      onComplete,
    ],
  );

  const getCorrectAnswer = (exercise: Exercise): string | string[] => {
    switch (exercise.type) {
      case "match":
        return exercise.pairs?.map((p) => `${p.tagalog}:${p.english}`) || [];
      case "multipleChoice":
      case "translate":
      case "fillBlank":
      case "speaking":
      case "listening":
      default:
        return exercise.answer || "";
    }
  };

  const renderExercise = () => {
    if (showFeedback && lastResult) {
      return (
        <div className="text-center py-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              lastResult.correct ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {lastResult.correct ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </div>

          <h3
            className={`text-2xl font-bold mb-2 ${
              lastResult.correct ? "text-green-400" : "text-red-400"
            }`}
          >
            {lastResult.correct ? "Correct!" : "Not quite right"}
          </h3>

          <p className="text-muted-foreground mb-4">
            {lastResult.correct
              ? `Great job! +${lastResult.xpEarned} XP`
              : `The correct answer was: ${lastResult.correctAnswer}`}
          </p>

          {streak > 1 && lastResult.correct && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Star className="w-5 h-5" />
                <span className="font-semibold">
                  {streak} correct in a row!
                </span>
              </div>
            </div>
          )}

          {lives <= 0 && !lastResult.correct && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
              <p className="text-red-400 font-semibold">
                Out of lives! Lesson complete.
              </p>
            </div>
          )}
        </div>
      );
    }

    switch (currentExercise.type) {
      case "translate":
        return (
          <TranslateExercise
            exercise={currentExercise}
            onSubmit={handleExerciseSubmit}
          />
        );
      case "multipleChoice":
        return (
          <MultipleChoiceExercise
            exercise={currentExercise}
            onSubmit={handleExerciseSubmit}
          />
        );
      case "fillBlank":
        return (
          <FillBlankExercise
            exercise={currentExercise}
            onSubmit={handleExerciseSubmit}
          />
        );
      case "match":
        return (
          <MatchExercise
            exercise={currentExercise}
            onSubmit={handleExerciseSubmit}
          />
        );
      case "speaking":
        return (
          <SpeakingExercise
            exercise={currentExercise}
            onSubmit={handleExerciseSubmit}
          />
        );
      case "listening":
        return (
          <ListeningExercise
            exercise={currentExercise}
            onSubmit={handleExerciseSubmit}
          />
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Unknown exercise type: {currentExercise.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <GameButton variant="ghost" onClick={onExit} className="p-2">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </GameButton>
            <div className="flex-1">
              <Progress value={progress} className="h-3 w-64" />
              <p className="text-sm text-muted-foreground mt-1">
                {currentExerciseIndex + 1} of {exercises.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Lives:</span>
              {[...Array(2)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${
                    i < lives
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>

            {streak > 0 && (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Star className="w-3 h-3 mr-1" />
                {streak} streak
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <GameCard className="min-h-96">
          <GameCardHeader>
            <GameCardTitle className="flex items-center justify-between">
              <span className="capitalize">
                {currentExercise.type} Exercise
              </span>
              <Badge variant="outline">{currentExercise.xp} XP</Badge>
            </GameCardTitle>
          </GameCardHeader>
          <GameCardContent className="p-8">{renderExercise()}</GameCardContent>
        </GameCard>
      </div>

      {/* Failure Dialog */}
      <Dialog open={showFailureDialog} onOpenChange={setShowFailureDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-xl">Exercise Failed</DialogTitle>
            <DialogDescription className="text-base">
              You&apos;ve run out of lives! Don&apos;t worry - practice makes
              perfect. Review the lesson material and try again when you&apos;re
              ready.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <GameButton
              variant="outline"
              onClick={() => {
                setShowFailureDialog(false);
                onExit();
              }}
              className="flex-1"
            >
              Back to Lesson
            </GameButton>
            <GameButton
              variant="primary"
              onClick={() => {
                setShowFailureDialog(false);
                // Reset exercise state
                setCurrentExerciseIndex(0);
                setResults([]);
                setLives(2);
                setStreak(0);
                setShowFeedback(false);
                setLastResult(null);
                setStartTime(Date.now());
              }}
              className="flex-1"
            >
              Try Again
            </GameButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
