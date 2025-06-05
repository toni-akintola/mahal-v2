"use client";

import React, { useState } from "react";
import { Exercise } from "@/types/types";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TranslateExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string, isCorrect: boolean) => void;
}

export function TranslateExercise({
  exercise,
  onSubmit,
}: TranslateExerciseProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    setSubmitted(true);

    // Check if answer is correct (case-insensitive, trimmed)
    const isCorrect =
      userAnswer.trim().toLowerCase() === exercise.answer?.toLowerCase();

    onSubmit(userAnswer.trim(), isCorrect);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !submitted) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Translate this word or phrase
        </h3>
        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <p className="text-3xl font-bold text-foreground">
            {exercise.question}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="translation" className="text-foreground font-medium">
            Your translation:
          </Label>
          <Input
            id="translation"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer..."
            disabled={submitted}
            className="mt-2 text-lg"
            autoFocus
          />
        </div>

        {exercise.hint && userAnswer.length > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-sm text-blue-200">
              <strong>Hint:</strong> {exercise.hint}
            </p>
          </div>
        )}

        <GameButton
          onClick={handleSubmit}
          disabled={!userAnswer.trim() || submitted}
          className="w-full py-3 font-semibold"
          variant="primary"
        >
          Check Answer
        </GameButton>
      </div>
    </div>
  );
}
