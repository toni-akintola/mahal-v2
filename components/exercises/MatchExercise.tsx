"use client";

import React, { useState, useEffect } from "react";
import { Exercise } from "@/types/types";
import { GameButton } from "@/components/ui/game-button";
import { CheckCircle, XCircle } from "lucide-react";

interface MatchExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string[], isCorrect: boolean) => void;
}

interface Match {
  tagalog: string;
  english: string;
  matched: boolean;
}

export function MatchExercise({ exercise, onSubmit }: MatchExerciseProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedTagalog, setSelectedTagalog] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [mistakes, setMistakes] = useState(0);

  // Initialize matches from exercise pairs
  useEffect(() => {
    if (exercise.pairs) {
      setMatches(exercise.pairs.map((pair) => ({ ...pair, matched: false })));
    }
  }, [exercise.pairs]);

  const handleTagalogSelect = (tagalog: string) => {
    if (submitted || showFeedback || mistakes >= 2) return;

    if (selectedTagalog === tagalog) {
      setSelectedTagalog(null);
    } else {
      setSelectedTagalog(tagalog);
      if (selectedEnglish) {
        // Try to match
        handleMatch(tagalog, selectedEnglish);
      }
    }
  };

  const handleEnglishSelect = (english: string) => {
    if (submitted || showFeedback || mistakes >= 2) return;

    if (selectedEnglish === english) {
      setSelectedEnglish(null);
    } else {
      setSelectedEnglish(english);
      if (selectedTagalog) {
        // Try to match
        handleMatch(selectedTagalog, english);
      }
    }
  };

  const handleMatch = (tagalog: string, english: string) => {
    const correctPair = exercise.pairs?.find(
      (pair) => pair.tagalog === tagalog && pair.english === english,
    );

    if (correctPair) {
      // Correct match
      setMatches((prev) =>
        prev.map((match) =>
          match.tagalog === tagalog ? { ...match, matched: true } : match,
        ),
      );
      setShowFeedback("correct");
    } else {
      // Incorrect match - show feedback and track mistake
      setShowFeedback("incorrect");
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      // If this is the second mistake, submit as failed
      if (newMistakes >= 2) {
        setTimeout(() => {
          onSubmit([`${tagalog}:${english}`], false);
        }, 1000);
        return;
      }
    }

    // Clear feedback after a short delay
    setTimeout(() => {
      setShowFeedback(null);
    }, 1000);

    // Clear selections but maintain their order by not resetting them immediately
    setTimeout(() => {
      setSelectedTagalog(null);
      setSelectedEnglish(null);
    }, 200);
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const allMatched = matches.every((match) => match.matched);
    const userMatches = matches
      .filter((m) => m.matched)
      .map((m) => `${m.tagalog}:${m.english}`);

    onSubmit(userMatches, allMatched);
  };

  const getTagalogStatus = (tagalog: string) => {
    const match = matches.find((m) => m.tagalog === tagalog);
    if (match?.matched) return "matched";
    if (selectedTagalog === tagalog) return "selected";
    return "available";
  };

  const getEnglishStatus = (english: string) => {
    const match = matches.find((m) => m.english === english);
    if (match?.matched) return "matched";
    if (selectedEnglish === english) return "selected";
    return "available";
  };

  const shuffledTagalog = [...(exercise.pairs || [])].sort(
    () => Math.random() - 0.5,
  );
  const shuffledEnglish = [...(exercise.pairs || [])].sort(
    () => Math.random() - 0.5,
  );
  const allMatched =
    matches.length > 0 && matches.every((match) => match.matched);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Match the Tagalog words with their English meanings
        </h3>
        <p className="text-muted-foreground mb-6">
          Click on a Tagalog word, then click on its English translation
        </p>

        {/* Lives indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Lives:</span>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < 2 - mistakes ? "bg-red-500" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Feedback display */}
        {showFeedback && (
          <div
            className={`flex items-center justify-center gap-2 mb-4 p-3 rounded-lg ${
              showFeedback === "correct"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {showFeedback === "correct" ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Correct match!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span>Wrong match. Try again!</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Tagalog Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-center text-blue-400 mb-4">
            Tagalog
          </h4>
          {shuffledTagalog.map((pair, index) => {
            const status = getTagalogStatus(pair.tagalog);
            return (
              <GameButton
                key={index}
                variant={status === "selected" ? "primary" : "outline"}
                className={`w-full p-4 text-left font-medium transition-all ${
                  status === "matched"
                    ? "bg-green-500/20 border-green-500 cursor-default"
                    : status === "selected"
                      ? "ring-2 ring-blue-500"
                      : "hover:bg-muted/50"
                }`}
                onClick={() => handleTagalogSelect(pair.tagalog)}
                disabled={
                  submitted ||
                  status === "matched" ||
                  showFeedback !== null ||
                  mistakes >= 2
                }
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{pair.tagalog}</span>
                  {status === "matched" && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </GameButton>
            );
          })}
        </div>

        {/* English Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-center text-red-400 mb-4">
            English
          </h4>
          {shuffledEnglish.map((pair, index) => {
            const status = getEnglishStatus(pair.english);
            return (
              <GameButton
                key={index}
                variant={status === "selected" ? "primary" : "outline"}
                className={`w-full p-4 text-left font-medium transition-all ${
                  status === "matched"
                    ? "bg-green-500/20 border-green-500 cursor-default"
                    : status === "selected"
                      ? "ring-2 ring-blue-500"
                      : "hover:bg-muted/50"
                }`}
                onClick={() => handleEnglishSelect(pair.english)}
                disabled={
                  submitted ||
                  status === "matched" ||
                  showFeedback !== null ||
                  mistakes >= 2
                }
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{pair.english}</span>
                  {status === "matched" && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </GameButton>
            );
          })}
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        <GameButton
          onClick={handleSubmit}
          disabled={!allMatched || submitted || mistakes >= 2}
          className="w-full py-3 font-semibold"
          variant="primary"
        >
          {mistakes >= 2
            ? "Exercise Failed"
            : allMatched
              ? "Check Answers"
              : `${matches.filter((m) => m.matched).length}/${matches.length} matched`}
        </GameButton>
      </div>
    </div>
  );
}
