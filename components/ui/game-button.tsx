"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "gold"
    | "destructive"
    | "outline"
    | "ghost"
    | "default";
  size?: "sm" | "md" | "lg";
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const variants = {
      primary: "bg-[#0060d4] border-[#003d96] text-white hover:bg-[#004bb5]",
      default: "bg-[#0060d4] border-[#003d96] text-white hover:bg-[#004bb5]",
      secondary: "bg-[#2a2a2a] border-[#3a3a3a] text-white hover:bg-[#242424]",
      gold: "bg-[#ffd700] border-[#b7791f] text-black hover:bg-[#d69e2e]",
      destructive:
        "bg-[#ce1126] border-[#991b1b] text-white hover:bg-[#b91c1c]",
      outline:
        "bg-transparent border-[#3a3a3a] text-[#a0a0a0] hover:bg-[#2a2a2a]",
      ghost:
        "bg-transparent border-transparent text-[#a0a0a0] hover:bg-[#2a2a2a]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const baseStyles =
      variant === "ghost"
        ? "rounded-xl font-bold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        : "rounded-xl border-[3px] border-b-[5px] font-bold uppercase tracking-[0.5px] transition-all duration-150 active:translate-y-[2px] active:border-b-[3px] disabled:opacity-50 disabled:cursor-not-allowed";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GameButton.displayName = "GameButton";

export { GameButton };
