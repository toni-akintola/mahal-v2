"use client";

import React, { useState } from "react";
import { Exercise } from "@/types/types";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";

interface FillBlankExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string, isCorrect: boolean) => void;
}

export function FillBlankExercise({
  exercise,
  onSubmit,
}: FillBlankExerciseProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const answerToCheck = selectedWord || userAnswer.trim();
    if (!answerToCheck) return;

    setSubmitted(true);

    // Check if answer is correct (case-insensitive)
    const isCorrect =
      answerToCheck.toLowerCase() === exercise.answer?.toLowerCase();

    onSubmit(answerToCheck, isCorrect);
  };

  const handleWordSelect = (word: string) => {
    if (submitted) return;
    setSelectedWord(word);
    setUserAnswer(word);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !submitted) {
      handleSubmit();
    }
  };

  // Split the question into parts around the blank (_____)
  const questionParts = exercise.question.split("_____");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-6">
          Fill in the blank
        </h3>

        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <div className="text-2xl font-bold text-foreground flex items-center justify-center flex-wrap gap-2">
            <span>{questionParts[0]}</span>

            <div className="relative">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="..."
                disabled={submitted}
                className={`text-2xl font-bold text-center w-32 ${
                  selectedWord ? "bg-blue-500/20 border-blue-500" : ""
                }`}
                autoFocus
              />
            </div>

            <span>{questionParts[1]}</span>
          </div>
        </div>
      </div>

      {exercise.wordBank && exercise.wordBank.length > 0 && (
        <div className="max-w-lg mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3 text-center">
            Choose from these words:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {exercise.wordBank.map((word, index) => (
              <GameButton
                key={index}
                variant={selectedWord === word ? "primary" : "outline"}
                className={`px-4 py-2 ${
                  selectedWord === word ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleWordSelect(word)}
                disabled={submitted}
              >
                {word}
              </GameButton>
            ))}
          </div>
        </div>
      )}

      {exercise.hint && userAnswer.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 max-w-lg mx-auto">
          <p className="text-sm text-blue-200">
            <strong>Hint:</strong> {exercise.hint}
          </p>
        </div>
      )}

      <div className="max-w-lg mx-auto">
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
