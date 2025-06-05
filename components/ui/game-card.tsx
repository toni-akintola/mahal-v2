"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "lesson" | "achievement" | "social";
  interactive?: boolean;
}

const GameCard = React.forwardRef<HTMLDivElement, GameCardProps>(
  (
    { className, variant = "default", interactive = false, children, ...props },
    ref,
  ) => {
    const variants = {
      default: "bg-card border-border",
      lesson: "bg-card border-border hover:border-blue-500",
      achievement: "bg-card border-border hover:border-yellow-500",
      social: "bg-card border-border hover:border-green-500",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border-4 shadow-lg transition-all duration-200",
          interactive &&
            "cursor-pointer hover:-translate-y-1 active:translate-y-0",
          variants[variant],
          className,
        )}
        style={{
          boxShadow: "0 4px 0 rgb(58 58 58)",
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GameCard.displayName = "GameCard";

const GameCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

GameCardHeader.displayName = "GameCardHeader";

const GameCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-none tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));

GameCardTitle.displayName = "GameCardTitle";

const GameCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

GameCardDescription.displayName = "GameCardDescription";

const GameCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

GameCardContent.displayName = "GameCardContent";

const GameCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

GameCardFooter.displayName = "GameCardFooter";

export {
  GameCard,
  GameCardHeader,
  GameCardTitle,
  GameCardDescription,
  GameCardContent,
  GameCardFooter,
};
