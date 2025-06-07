"use client";

import React, { useState, useRef } from "react";
import { Exercise } from "@/types/types";
import { GameButton } from "@/components/ui/game-button";
import { Mic, Volume2, Loader2, AlertCircle } from "lucide-react";
import { useTTS } from "@/lib/hooks/use-tts";

interface SpeakingExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string, isCorrect: boolean) => void;
}

export function SpeakingExercise({
  exercise,
  onSubmit,
}: SpeakingExerciseProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const { speak, isLoading: ttsLoading } = useTTS();

  const startRecording = async () => {
    try {
      setError(null);
      setTranscription("");
      setShowResult(false);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsProcessing(true);

        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType,
        });

        // Send to speech-to-text API
        await processAudio(audioBlob);

        // Cleanup
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Could not access microphone. Please check permissions.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Speech recognition failed");
      }

      const result = await response.json();
      setTranscription(result.text);
      // setConfidence(result.confidence);
      setShowResult(true);
      setError(null);
    } catch (err) {
      console.error("Error processing audio:", err);
      setError(
        err instanceof Error ? err.message : "Speech recognition failed",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const playTargetAudio = () => {
    const textToSpeak = exercise.text || exercise.question;
    if (textToSpeak) {
      speak(textToSpeak);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);

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
    setError(null);
    // setConfidence(0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Say this word or phrase
        </h3>
        <p className="text-muted-foreground mb-6">
          Record your voice and speak clearly. Works on all devices!
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
              disabled={ttsLoading}
            >
              {ttsLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
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
      <div className="max-w-md mx-auto">
        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <div className="flex flex-col items-center gap-4">
            <GameButton
              onClick={isRecording ? stopRecording : startRecording}
              disabled={submitted || isProcessing}
              variant={isRecording ? "destructive" : "primary"}
              className="px-6 py-3 min-w-[160px] flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isRecording ? (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </>
              )}
            </GameButton>

            {isRecording && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Listening... Speak clearly!
              </p>
            )}

            {isProcessing && (
              <p className="text-sm text-muted-foreground">
                Converting speech to text...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-md mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Recording Error</p>
            </div>
            <p className="text-sm text-red-300 mt-1">{error}</p>
            <GameButton
              onClick={tryAgain}
              variant="outline"
              className="mt-3 text-xs"
            >
              Try Again
            </GameButton>
          </div>
        </div>
      )}

      {/* Result Display */}
      {showResult && transcription && (
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-foreground mb-2">
              What we heard:
            </h4>
            <p className="text-lg text-muted-foreground italic mb-2">
              &quot;{transcription}&quot;
            </p>
            {/* {confidence > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Confidence:</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
                <span>{Math.round(confidence * 100)}%</span>
              </div>
            )} */}
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

      {!showResult && !isRecording && !isProcessing && !error && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Click &quot;Start Recording&quot; to begin
          </p>
        </div>
      )}
    </div>
  );
}
