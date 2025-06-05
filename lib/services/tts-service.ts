export interface TTSOptions {
  voice?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export class TTSService {
  private static instance: TTSService;
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;

  private constructor() {}

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      // Stop any currently playing audio
      this.stop();

      options.onStart?.();
      this.isPlaying = true;

      // Call the TTS API
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice: options.voice || "RnW8EXHv9GqGMgyP0sXG", // Default Filipino voice
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("audio/mpeg")) {
        // Eleven Labs returned audio
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        this.currentAudio = new Audio(audioUrl);

        this.currentAudio.onended = () => {
          this.cleanup();
          options.onEnd?.();
        };

        this.currentAudio.onerror = () => {
          const error = new Error("Audio playback failed");
          this.cleanup();
          options.onError?.(error);
        };

        await this.currentAudio.play();
      } else {
        // Fallback to browser speech synthesis
        const data = await response.json();
        console.log("Using browser speech synthesis fallback:", data.message);

        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text);

          // Try to find a Filipino voice
          const voices = speechSynthesis.getVoices();
          const filipinoVoice = voices.find(
            (voice) =>
              voice.lang.includes("fil") ||
              voice.lang.includes("tl") ||
              voice.name.toLowerCase().includes("filipino"),
          );

          if (filipinoVoice) {
            utterance.voice = filipinoVoice;
          } else {
            // Fallback to English voice with slower rate for better pronunciation
            utterance.rate = 0.8;
            utterance.lang = "en-US";
          }

          utterance.onend = () => {
            this.cleanup();
            options.onEnd?.();
          };

          utterance.onerror = () => {
            const error = new Error("Speech synthesis failed");
            this.cleanup();
            options.onError?.(error);
          };

          speechSynthesis.speak(utterance);
        } else {
          throw new Error("Speech synthesis not supported");
        }
      }
    } catch (error) {
      this.cleanup();
      options.onError?.(error as Error);
      console.error("TTS Error:", error);
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }

    this.cleanup();
  }

  private cleanup(): void {
    if (this.currentAudio) {
      URL.revokeObjectURL(this.currentAudio.src);
      this.currentAudio = null;
    }
    this.isPlaying = false;
  }

  get playing(): boolean {
    return this.isPlaying;
  }
}

// Export singleton instance
export const ttsService = TTSService.getInstance();
