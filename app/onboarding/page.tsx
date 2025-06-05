"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GameCard, GameCardContent } from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Globe,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface OnboardingData {
  motivation: string;
  experience: string;
  goals: string[];
  dailyTime: string;
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

const experienceOptions = [
  {
    id: "absolute-beginner",
    title: "Absolute Beginner",
    description: "I know no Tagalog at all",
    level: "Level 0",
  },
  {
    id: "some-words",
    title: "Know Some Words",
    description: "I know basic greetings and a few phrases",
    level: "Level 1",
  },
  {
    id: "basic-conversations",
    title: "Basic Conversations",
    description: "I can have simple conversations",
    level: "Level 2",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "I understand most conversations but need practice",
    level: "Level 3",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "I speak well but want to perfect my skills",
    level: "Level 4",
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

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    motivation: "",
    experience: "",
    goals: [],
    dailyTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalSteps = 4;

  const updateData = (key: keyof OnboardingData, value: string | string[]) => {
    setOnboardingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleGoal = (goalId: string) => {
    const currentGoals = onboardingData.goals;
    if (currentGoals.includes(goalId)) {
      updateData(
        "goals",
        currentGoals.filter((g) => g !== goalId),
      );
    } else {
      updateData("goals", [...currentGoals, goalId]);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const finishOnboarding = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivation: onboardingData.motivation,
          experience: onboardingData.experience,
          goals: onboardingData.goals,
          dailyTime: onboardingData.dailyTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete onboarding");
      }

      const data = await response.json();
      console.log("Onboarding completed:", data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return onboardingData.motivation !== "";
      case 2:
        return onboardingData.experience !== "";
      case 3:
        return onboardingData.goals.length > 0;
      case 4:
        return onboardingData.dailyTime !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Why are you learning Tagalog?
              </h2>
              <p className="text-muted-foreground">
                This helps us personalize your learning experience
              </p>
            </div>

            <div className="space-y-3">
              {motivationOptions.map((option) => (
                <GameCard
                  key={option.id}
                  interactive
                  className={`cursor-pointer transition-all ${
                    onboardingData.motivation === option.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => updateData("motivation", option.id)}
                >
                  <GameCardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`${option.color}`}>{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {onboardingData.motivation === option.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </GameCardContent>
                </GameCard>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                What&apos;s your current level?
              </h2>
              <p className="text-muted-foreground">
                We&apos;ll customize lessons based on your experience
              </p>
            </div>

            <div className="space-y-3">
              {experienceOptions.map((option) => (
                <GameCard
                  key={option.id}
                  interactive
                  className={`cursor-pointer transition-all ${
                    onboardingData.experience === option.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => updateData("experience", option.id)}
                >
                  <GameCardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {option.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {option.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {onboardingData.experience === option.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </GameCardContent>
                </GameCard>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                What are your goals?
              </h2>
              <p className="text-muted-foreground">
                Select all that apply - we&apos;ll help you achieve them
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {goalOptions.map((option) => {
                const isSelected = onboardingData.goals.includes(option.id);
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
                          <h3 className="font-semibold text-foreground mb-1">
                            {option.title}
                          </h3>
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

            {onboardingData.goals.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {onboardingData.goals.length} goal
                  {onboardingData.goals.length > 1 ? "s" : ""} selected
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                How much time can you commit daily?
              </h2>
              <p className="text-muted-foreground">
                Consistency is key - choose a realistic goal
              </p>
            </div>

            <div className="space-y-3">
              {timeOptions.map((option) => (
                <GameCard
                  key={option.id}
                  interactive
                  className={`cursor-pointer transition-all ${
                    onboardingData.dailyTime === option.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => updateData("dailyTime", option.id)}
                >
                  <GameCardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-blue-400">{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {onboardingData.dailyTime === option.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </GameCardContent>
                </GameCard>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🇵🇭</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Welcome to Mahal!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s personalize your learning journey
                </p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {step} of {totalSteps}
            </Badge>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <GameCard className="shadow-xl">
          <GameCardContent className="p-8">{renderStep()}</GameCardContent>
        </GameCard>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <GameButton
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </GameButton>

          {step < totalSteps ? (
            <GameButton
              variant="primary"
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </GameButton>
          ) : (
            <GameButton
              variant="primary"
              onClick={finishOnboarding}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  Start Learning
                  <Star className="w-4 h-4" />
                </>
              )}
            </GameButton>
          )}
        </div>
      </div>
    </div>
  );
}
