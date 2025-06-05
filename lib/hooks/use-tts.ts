import { useState, useCallback } from "react";
import { ttsService, TTSOptions } from "@/lib/services/tts-service";

export interface UseTTSReturn {
  speak: (text: string, options?: TTSOptions) => Promise<void>;
  stop: () => void;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useTTS(): UseTTSReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback(async (text: string, options: TTSOptions = {}) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await ttsService.speak(text, {
        ...options,
        onStart: () => {
          setIsLoading(false);
          setIsPlaying(true);
          options.onStart?.();
        },
        onEnd: () => {
          setIsPlaying(false);
          options.onEnd?.();
        },
        onError: (err) => {
          setIsLoading(false);
          setIsPlaying(false);
          setError(err.message);
          options.onError?.(err);
        },
      });
    } catch (err) {
      setIsLoading(false);
      setIsPlaying(false);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, []);

  const stop = useCallback(() => {
    ttsService.stop();
    setIsPlaying(false);
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
    error,
  };
}
