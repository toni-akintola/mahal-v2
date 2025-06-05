"use client";

import React, { useState, useEffect, useRef } from "react";
import { Exercise } from "@/types/types";
import { GameButton } from "@/components/ui/game-button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Loader2, X } from "lucide-react";

interface ListeningExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string, isCorrect: boolean) => void;
}

export function ListeningExercise({
  exercise,
  onSubmit,
}: ListeningExerciseProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate audio when component mounts
  useEffect(() => {
    generateAudio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateAudio = async () => {
    if (!exercise.text) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: exercise.text,
          voice: "rachel", // Eleven Labs voice
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      } else {
        console.error("Failed to generate audio");
        // Fallback to Web Speech API
        speakText(exercise.text);
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      // Fallback to Web Speech API
      speakText(exercise.text);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tl-PH"; // Filipino
      utterance.rate = 0.8;
      utterance.pitch = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);

      speechSynthesis.speak(utterance);
    }
  };

  const handlePlayAudio = () => {
    if (!audioUrl && !exercise.text) return;

    setPlayCount((prev) => prev + 1);

    if (audioUrl && audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    } else if (exercise.text) {
      speakText(exercise.text);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleWordClick = (word: string) => {
    if (submitted) return;
    setSelectedWords((prev) => [...prev, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (submitted) return;
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedWords.length === 0) return;

    setSubmitted(true);

    const userAnswer = selectedWords.join(" ");
    // Check if answer is correct (case-insensitive)
    const isCorrect =
      userAnswer.toLowerCase().trim() === exercise.answer?.toLowerCase().trim();

    onSubmit(userAnswer, isCorrect);
  };

  const canPlayAgain = playCount < 3; // Limit to 3 plays

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Listen and build the sentence
        </h3>
        <p className="text-muted-foreground mb-6">
          Click the words in the correct order. You can listen up to 3 times.
        </p>
      </div>

      {/* Audio Player */}
      <div className="text-center">
        <div className="bg-muted/50 rounded-lg p-8 mb-6 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isLoading ? "bg-muted" : "bg-blue-500"
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              ) : (
                <Volume2 className="w-8 h-8 text-white" />
              )}
            </div>

            <GameButton
              onClick={handlePlayAudio}
              disabled={isLoading || isPlaying || !canPlayAgain}
              variant="primary"
              className="px-6 py-3"
            >
              {isLoading
                ? "Generating Audio..."
                : isPlaying
                  ? "Playing..."
                  : !canPlayAgain
                    ? "No more plays"
                    : `Play Audio (${3 - playCount} left)`}
            </GameButton>
          </div>
        </div>

        {/* Hidden audio element for Eleven Labs audio */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            preload="auto"
          />
        )}
      </div>

      {/* Selected Words Display */}
      <div className="max-w-2xl mx-auto">
        <div className="min-h-[80px] bg-muted/30 rounded-lg border-2 border-dashed border-border p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-2">Your sentence:</p>
          {selectedWords.length === 0 ? (
            <p className="text-muted-foreground italic text-center py-4">
              Click words below to build your sentence
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="text-lg px-3 py-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleRemoveWord(index)}
                >
                  {word}
                  <X className="w-4 h-4 ml-2" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Word Bank */}
        {exercise.wordBank && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Word Bank - Click to add words:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {exercise.wordBank.map((word, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-lg px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleWordClick(word)}
                >
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {exercise.hint && selectedWords.length > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-400">
              <strong>Hint:</strong> {exercise.hint}
            </p>
          </div>
        )}

        <GameButton
          onClick={handleSubmit}
          disabled={selectedWords.length === 0 || submitted}
          className="w-full py-3 font-semibold mt-6"
          variant="primary"
        >
          Check Answer
        </GameButton>
      </div>

      {/* Play count indicator */}
      <div className="text-center">
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < playCount ? "bg-blue-500" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Audio plays used</p>
      </div>
    </div>
  );
}
