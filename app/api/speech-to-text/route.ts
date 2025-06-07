import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 },
      );
    }

    // Create form data for ElevenLabs API
    const elevenLabsFormData = new FormData();
    elevenLabsFormData.append("file", audioFile);
    elevenLabsFormData.append("model_id", "scribe_v1");
    elevenLabsFormData.append("timestamps_granularity", "word");
    elevenLabsFormData.append("tag_audio_events", "false");

    const response = await fetch(
      "https://api.elevenlabs.io/v1/speech-to-text",
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: elevenLabsFormData,
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("ElevenLabs API error:", errorData);
      return NextResponse.json(
        { error: "Speech recognition failed", details: errorData },
        { status: response.status },
      );
    }

    const result = await response.json();

    return NextResponse.json({
      text: result.text,
      confidence: result.language_probability || 1,
      language: result.language_code,
      words: result.words || [],
    });
  } catch (error) {
    console.error("Speech-to-text error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
