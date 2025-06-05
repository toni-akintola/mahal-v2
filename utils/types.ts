export type Lesson = {
  id: number;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  category?: string;
  guidebook: Guidebook;
  exercises: Exercise[];
};

export type Guidebook = {
  keyPhrases: {
    tagalog: string;
    english: string;
    pronunciation: string;
  }[];
  vocabulary: {
    word: string;
    meaning: string;
    pronunciation: string;
  }[];
  tips: string[];
  culturalNotes: string;
};

export type Exercise = {
  type:
    | "translate"
    | "multipleChoice"
    | "fillBlank"
    | "match"
    | "speaking"
    | "listening";
  question: string;
  answer?: string;
  options?: string[];
  hint?: string;
  pairs?: { tagalog: string; english: string }[];
  text?: string;
  wordBank?: string[];
  xp: number;
};

export type MatchExercise = {
  type: "match";
  pairs: { tagalog: string; english: string }[];
};
