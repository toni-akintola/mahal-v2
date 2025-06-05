"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Star, Flame, Heart } from "lucide-react";

interface GameCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string;
  icon?: React.ReactNode;
  variant?: "xp" | "streak" | "hearts";
}

const GameCounter = React.forwardRef<HTMLDivElement, GameCounterProps>(
  ({ className, value, icon, variant = "xp", ...props }, ref) => {
    const variants = {
      xp: "text-yellow-400",
      streak: "text-red-400",
      hearts: "text-red-400",
    };

    const defaultIcons = {
      xp: <Star className="w-4 h-4 fill-current" />,
      streak: <Flame className="w-4 h-4" />,
      hearts: <Heart className="w-4 h-4 fill-current" />,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm text-muted-foreground hover:text-foreground transition-colors",
          variants[variant],
          className,
        )}
        {...props}
      >
        {icon || defaultIcons[variant]}
        <span>{value}</span>
      </div>
    );
  },
);

GameCounter.displayName = "GameCounter";

// Specific counter components for convenience
const XPCounter = React.forwardRef<
  HTMLDivElement,
  Omit<GameCounterProps, "variant">
>((props, ref) => <GameCounter ref={ref} variant="xp" {...props} />);

const StreakCounter = React.forwardRef<
  HTMLDivElement,
  Omit<GameCounterProps, "variant">
>((props, ref) => <GameCounter ref={ref} variant="streak" {...props} />);

const HeartsCounter = React.forwardRef<
  HTMLDivElement,
  Omit<GameCounterProps, "variant">
>((props, ref) => <GameCounter ref={ref} variant="hearts" {...props} />);

XPCounter.displayName = "XPCounter";
StreakCounter.displayName = "StreakCounter";
HeartsCounter.displayName = "HeartsCounter";

export { GameCounter, XPCounter, StreakCounter, HeartsCounter };
