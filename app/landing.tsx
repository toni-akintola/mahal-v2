"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  GameCard,
  GameCardContent,
  GameCardHeader,
  GameCardTitle,
} from "@/components/ui/game-card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Star,
  Users,
  Trophy,
  Heart,
  Flame,
  ArrowRight,
  CheckCircle,
  Globe,
  BookOpen,
  MessageCircle,
} from "lucide-react";

const TalaChat = () => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <div className="flex-1">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-4">
            <p className="text-foreground font-medium mb-2">
              &quot;Kumusta ka? Let&apos;s learn some basic Tagalog greetings
              today!&quot;
            </p>
            <div className="text-xs text-muted-foreground">
              Tala • Your AI Learning Companion
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="border border-border hover:bg-card/50 text-foreground px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
              <Play className="w-3 h-3" />
              Pronounce
            </button>
            <button className="border border-border hover:bg-card/50 text-foreground px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MahalLanding() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🇵🇭</span>
              </div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                Mahal
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome back, {user?.firstName || "Learner"}!
                  </span>
                  <Link href="/dashboard">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      Continue Learning
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <SignInButton mode="modal">
                    <button className="text-muted-foreground hover:text-foreground px-3 py-2 font-medium transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Get Started Free
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
                  <Star className="w-3 h-3 mr-1" />
                  #1 Tagalog Learning Platform
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Master{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                    Tagalog
                  </span>{" "}
                  with Mahal
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  Learn Filipino the fun way with gamified lessons, AI-powered
                  conversations, and cultural immersion. Join thousands
                  discovering their heritage language.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isSignedIn ? (
                  <Link href="/dashboard">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2 text-lg">
                      <Play className="w-5 h-5" />
                      Continue Learning
                    </button>
                  </Link>
                ) : (
                  <SignUpButton mode="modal">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2 text-lg">
                      <Play className="w-5 h-5" />
                      Start Learning Free
                    </button>
                  </SignUpButton>
                )}
                <Link href="https://www.youtube.com/channel/UCR5h2liUa03_r2pS2MdH5bg">
                  <button className="border border-border hover:bg-card/50 text-foreground px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 text-lg w-full sm:w-auto justify-center">
                    <Globe className="w-5 h-5" />
                    Explore Culture
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full border-2 border-background"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Join our
                    </span>{" "}
                    beta community
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">β</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Early access • Free to use
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <TalaChat />

              <div className="grid grid-cols-2 gap-4">
                <GameCard className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
                  <GameCardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="font-bold text-foreground">50+ Lessons</div>
                    <div className="text-xs text-muted-foreground">
                      Interactive content
                    </div>
                  </GameCardContent>
                </GameCard>

                <GameCard className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
                  <GameCardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="font-bold text-foreground">
                      Cultural Focus
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Learn with context
                    </div>
                  </GameCardContent>
                </GameCard>

                <GameCard className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
                  <GameCardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="font-bold text-foreground">Community</div>
                    <div className="text-xs text-muted-foreground">
                      Learn together
                    </div>
                  </GameCardContent>
                </GameCard>

                <GameCard className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
                  <GameCardContent className="p-4 text-center">
                    <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="font-bold text-foreground">
                      Daily Streaks
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Stay motivated
                    </div>
                  </GameCardContent>
                </GameCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Mahal?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the most comprehensive and culturally-rich Tagalog
              learning platform, designed specifically for Filipino heritage
              learners and enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GameCard>
              <GameCardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <GameCardTitle className="text-foreground">
                  Interactive Lessons
                </GameCardTitle>
              </GameCardHeader>
              <GameCardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Gamified learning experience with immediate feedback, progress
                  tracking, and adaptive difficulty.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">
                    50+ Interactive exercises
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">
                    Real-time pronunciation feedback
                  </span>
                </div>
              </GameCardContent>
            </GameCard>

            <GameCard>
              <GameCardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <GameCardTitle className="text-foreground">
                  Cultural Immersion
                </GameCardTitle>
              </GameCardHeader>
              <GameCardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Learn more than just language - understand Filipino culture,
                  traditions, and context.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">
                    Cultural context in every lesson
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">
                    Regional dialects and variations
                  </span>
                </div>
              </GameCardContent>
            </GameCard>

            <GameCard>
              <GameCardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <GameCardTitle className="text-foreground">
                  Community Learning
                </GameCardTitle>
              </GameCardHeader>
              <GameCardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Connect with fellow learners, compete in challenges, and
                  practice with native speakers.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">
                    Study groups and challenges
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">
                    Leaderboards and achievements
                  </span>
                </div>
              </GameCardContent>
            </GameCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners discovering the beauty of Tagalog. Start
            your free account today and take the first step towards fluency.
          </p>

          {isSignedIn ? (
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2 text-lg">
                <Play className="w-5 h-5" />
                Continue Learning
              </button>
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2 text-lg">
                <Play className="w-5 h-5" />
                Start Learning Free
              </button>
            </SignUpButton>
          )}
        </div>
      </section>
    </div>
  );
}
