import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!,
});
const VOICE_ID = "RnW8EXHv9GqGMgyP0sXG";
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    try {
      // Generate audio using Eleven Labs
      const audio = await elevenlabs.textToSpeech.convert(VOICE_ID, {
        text: text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      });

      // Return audio stream as response for browser to play
      return new NextResponse(audio as any, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
        },
      });
    } catch (elevenLabsError) {
      console.error("Eleven Labs API error:", elevenLabsError);

      // Fallback response
      return NextResponse.json(
        {
          message:
            "TTS endpoint failed - using browser speech synthesis as fallback",
          text,
          voice: VOICE_ID,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 },
    );
  }
}
