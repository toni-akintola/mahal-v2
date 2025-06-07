"use client";

import React, { useState } from "react";
import { GameCard, GameCardContent } from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Globe,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle,
  X,
  Save,
} from "lucide-react";
import { users } from "@/lib/db/schema";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: typeof users.$inferSelect;
  onSave: (updates: UserSettingsUpdate) => Promise<void>;
}

interface UserSettingsUpdate {
  motivation: string;
  goals: string[];
  dailyTimeCommitment: string;
}

const motivationOptions = [
  {
    id: "heritage",
    title: "Connect with Heritage",
    description: "Learn the language of my ancestors",
    icon: <Heart className="w-6 h-6" />,
    color: "text-red-400",
  },
  {
    id: "travel",
    title: "Travel to Philippines",
    description: "Plan to visit or move to the Philippines",
    icon: <Globe className="w-6 h-6" />,
    color: "text-blue-400",
  },
  {
    id: "family",
    title: "Talk with Family",
    description: "Communicate better with Filipino relatives",
    icon: <Users className="w-6 h-6" />,
    color: "text-green-400",
  },
  {
    id: "work",
    title: "Professional Growth",
    description: "Advance career or business opportunities",
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-purple-400",
  },
  {
    id: "academic",
    title: "Academic Interest",
    description: "Study Filipino culture and linguistics",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "text-yellow-400",
  },
];

const goalOptions = [
  {
    id: "basic-conversation",
    title: "Basic Conversation",
    description: "Have simple daily conversations",
  },
  {
    id: "fluency",
    title: "Achieve Fluency",
    description: "Speak Tagalog like a native speaker",
  },
  {
    id: "reading-writing",
    title: "Reading & Writing",
    description: "Read books and write in Tagalog",
  },
  {
    id: "business-tagalog",
    title: "Business Tagalog",
    description: "Use Tagalog in professional settings",
  },
  {
    id: "cultural-understanding",
    title: "Cultural Understanding",
    description: "Understand Filipino culture deeply",
  },
  {
    id: "family-communication",
    title: "Family Communication",
    description: "Talk with Filipino family members",
  },
];

const timeOptions = [
  {
    id: "5-minutes",
    title: "5 minutes",
    description: "Just a quick daily practice",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "10-minutes",
    title: "10 minutes",
    description: "Short but consistent learning",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "15-minutes",
    title: "15 minutes",
    description: "Balanced daily commitment",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "30-minutes",
    title: "30 minutes",
    description: "Serious about learning",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "1-hour",
    title: "1+ hours",
    description: "Intensive learning mode",
    icon: <Clock className="w-5 h-5" />,
  },
];

function getExperienceLabel(experience: string): string {
  switch (experience) {
    case "absolute-beginner":
      return "Absolute Beginner";
    case "some-words":
      return "Know Some Words";
    case "basic-conversations":
      return "Basic Conversations";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    default:
      return "Not specified";
  }
}

export function UserSettingsModal({
  isOpen,
  onClose,
  user,
  onSave,
}: UserSettingsModalProps) {
  const [motivation, setMotivation] = useState(user.motivation || "");
  const [goals, setGoals] = useState<string[]>(user.goals || []);
  const [dailyTimeCommitment, setDailyTimeCommitment] = useState(
    user.dailyTimeCommitment || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  const toggleGoal = (goalId: string) => {
    if (goals.includes(goalId)) {
      setGoals(goals.filter((g) => g !== goalId));
    } else {
      setGoals([...goals, goalId]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        motivation,
        goals,
        dailyTimeCommitment,
      });
      onClose();
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    motivation !== (user.motivation || "") ||
    JSON.stringify(goals) !== JSON.stringify(user.goals || []) ||
    dailyTimeCommitment !== (user.dailyTimeCommitment || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              User Settings
            </h2>
            <p className="text-muted-foreground mt-1">
              Update your learning preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Experience Level - Read Only */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Current Experience Level
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">
                    {getExperienceLabel(user.experience || "")}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Experience level cannot be changed to maintain lesson
                    progression
                  </p>
                </div>
                <Badge variant="outline">Read Only</Badge>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Why are you learning Tagalog?
            </h3>
            <div className="space-y-3">
              {motivationOptions.map((option) => (
                <GameCard
                  key={option.id}
                  interactive
                  className={`cursor-pointer transition-all ${
                    motivation === option.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => setMotivation(option.id)}
                >
                  <GameCardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`${option.color}`}>{option.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {option.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {motivation === option.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </GameCardContent>
                </GameCard>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              What are your goals?
            </h3>
            <p className="text-muted-foreground mb-4">Select all that apply</p>
            <div className="grid md:grid-cols-2 gap-3">
              {goalOptions.map((option) => {
                const isSelected = goals.includes(option.id);
                return (
                  <GameCard
                    key={option.id}
                    interactive
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10"
                        : "hover:border-blue-300"
                    }`}
                    onClick={() => toggleGoal(option.id)}
                  >
                    <GameCardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {option.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    </GameCardContent>
                  </GameCard>
                );
              })}
            </div>
            {goals.length > 0 && (
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {goals.length} goal{goals.length > 1 ? "s" : ""} selected
                </p>
              </div>
            )}
          </div>

          {/* Daily Time Commitment */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Daily Time Commitment
            </h3>
            <p className="text-muted-foreground mb-4">
              This affects your daily XP goal
            </p>
            <div className="space-y-3">
              {timeOptions.map((option) => (
                <GameCard
                  key={option.id}
                  interactive
                  className={`cursor-pointer transition-all ${
                    dailyTimeCommitment === option.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => setDailyTimeCommitment(option.id)}
                >
                  <GameCardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-blue-400">{option.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {option.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {dailyTimeCommitment === option.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </GameCardContent>
                </GameCard>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <GameButton variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </GameButton>
          <GameButton
            variant="primary"
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </GameButton>
        </div>
      </div>
    </div>
  );
}
