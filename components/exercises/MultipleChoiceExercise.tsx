"use client";

import React, { useState } from "react";
import { Exercise } from "@/utils/types";
import { GameButton } from "@/components/ui/game-button";

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string, isCorrect: boolean) => void;
}

export function MultipleChoiceExercise({
  exercise,
  onSubmit,
}: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption) return;

    setSubmitted(true);

    // Check if answer is correct
    const isCorrect = selectedOption === exercise.answer;

    onSubmit(selectedOption, isCorrect);
  };

  const handleOptionSelect = (option: string) => {
    if (submitted) return;
    setSelectedOption(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-6">
          {exercise.question}
        </h3>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        {exercise.options?.map((option, index) => (
          <GameButton
            key={index}
            variant={selectedOption === option ? "primary" : "outline"}
            className={`w-full p-4 text-left font-medium transition-all ${
              selectedOption === option
                ? "ring-2 ring-blue-500"
                : "hover:bg-muted/50"
            }`}
            onClick={() => handleOptionSelect(option)}
            disabled={submitted}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option
                    ? "border-blue-500 bg-blue-500"
                    : "border-muted-foreground"
                }`}
              >
                {selectedOption === option && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="text-lg">{option}</span>
            </div>
          </GameButton>
        ))}
      </div>

      {exercise.hint && selectedOption && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 max-w-lg mx-auto">
          <p className="text-sm text-blue-200">
            <strong>Hint:</strong> {exercise.hint}
          </p>
        </div>
      )}

      <div className="max-w-lg mx-auto">
        <GameButton
          onClick={handleSubmit}
          disabled={!selectedOption || submitted}
          className="w-full py-3 font-semibold"
          variant="primary"
        >
          Check Answer
        </GameButton>
      </div>
    </div>
  );
}
