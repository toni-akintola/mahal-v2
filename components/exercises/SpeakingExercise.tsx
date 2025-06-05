"use client";

import React, { useState, useEffect, useRef } from "react";
import { Exercise } from "@/types/types";
import { GameButton } from "@/components/ui/game-button";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";

// TypeScript interfaces for Web Speech API
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionStatic;
    webkitSpeechRecognition?: SpeechRecognitionStatic;
  }
}

interface SpeakingExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string, isCorrect: boolean) => void;
}

export function SpeakingExercise({
  exercise,
  onSubmit,
}: SpeakingExerciseProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "tl-PH"; // Filipino

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[0][0].transcript;
        setTranscription(result);
        setIsRecording(false);
        setShowResult(true);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current || isRecording) return;

    setTranscription("");
    setShowResult(false);
    setIsRecording(true);

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const playTargetAudio = () => {
    const textToSpeak = exercise.text || exercise.question;
    if ("speechSynthesis" in window && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "tl-PH"; // Filipino
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);

    // Simple pronunciation check - compare transcribed text with expected text
    const normalizedTranscription = transcription.toLowerCase().trim();
    const expectedText =
      exercise.text || exercise.answer || exercise.question || "";
    const normalizedExpected = expectedText.toLowerCase().trim();

    // Calculate similarity (simple approach)
    const isCorrect =
      normalizedTranscription === normalizedExpected ||
      calculateSimilarity(normalizedTranscription, normalizedExpected) > 0.7;

    onSubmit(transcription, isCorrect);
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    // Simple Levenshtein distance calculation
    const matrix: number[][] = [];
    const n = str1.length;
    const m = str2.length;

    if (n === 0) return m === 0 ? 1 : 0;
    if (m === 0) return 0;

    for (let i = 0; i <= m; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= n; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[j - 1] === str2[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost,
        );
      }
    }

    return 1 - matrix[m][n] / Math.max(n, m);
  };

  const tryAgain = () => {
    setTranscription("");
    setShowResult(false);
    setSubmitted(false);
  };

  if (!isSupported) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <MicOff className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Speech Recognition Not Supported
        </h3>
        <p className="text-muted-foreground mb-6">
          Your browser doesn&apos;t support speech recognition. Please use
          Chrome or Edge for the best experience.
        </p>
        <GameButton onClick={() => onSubmit("skipped", true)} variant="outline">
          Skip Exercise
        </GameButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Say this word or phrase
        </h3>
        <p className="text-muted-foreground mb-6">
          Click the microphone and speak clearly
        </p>
      </div>

      {/* Target Text */}
      <div className="text-center">
        <div className="bg-muted/50 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <p className="text-3xl font-bold text-foreground">
              {exercise.text || exercise.question}
            </p>
            <GameButton
              onClick={playTargetAudio}
              variant="ghost"
              className="p-2"
            >
              <Volume2 className="w-6 h-6" />
            </GameButton>
          </div>

          {exercise.hint && (
            <p className="text-sm text-muted-foreground italic">
              {exercise.hint}
            </p>
          )}
        </div>
      </div>

      {/* Recording Interface */}
      <div className="text-center">
        <div className="bg-muted/50 rounded-lg p-8 mb-6 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRecording ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </div>

            <GameButton
              onClick={isRecording ? stopRecording : startRecording}
              disabled={submitted}
              variant={isRecording ? "destructive" : "primary"}
              className="px-6 py-3"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </GameButton>

            {isRecording && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Listening...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Transcription Result */}
      {showResult && transcription && (
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-foreground mb-2">
              What we heard:
            </h4>
            <p className="text-lg text-muted-foreground italic">
              &quot;{transcription}&quot;
            </p>
          </div>

          <div className="flex gap-3">
            <GameButton
              onClick={tryAgain}
              disabled={submitted}
              variant="outline"
              className="flex-1"
            >
              Try Again
            </GameButton>
            <GameButton
              onClick={handleSubmit}
              disabled={submitted}
              variant="primary"
              className="flex-1"
            >
              Submit
            </GameButton>
          </div>
        </div>
      )}

      {!showResult && !isRecording && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Tap the microphone to start recording
          </p>
        </div>
      )}
    </div>
  );
}
