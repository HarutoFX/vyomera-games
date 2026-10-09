"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(
  ({
    children,
    className,
    colors = [
      "#FF263D", // Crimson Red
      "#FF3D5A", // Coral Pink
      "#E141E9", // Vivid Magenta
      "#A855F7", // Electric Purple
      "#6366F1", // Indigo
      "#3B82F6", // Bright Blue
      "#00D4FF", // Neon Cyan
    ],
    speed = 1,
    ...props
  }: AuroraTextProps) => {
    const fullColors = [...colors, colors[4] ?? "#6366F1", colors[2] ?? "#E141E9", colors[0]];
    const gradient = `linear-gradient(90deg, ${fullColors.join(", ")})`;

    const gradientStyle: React.CSSProperties = {
      backgroundImage: gradient,
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      animationDuration: `${3 / speed}s`,
    };

    return (
      <span
        className={cn("relative inline-block isolate", className)}
        {...props}
      >
        <span className="sr-only">{children}</span>

        {/* Ambient colored neon glow matching the exact aurora gradient */}
        <span
          className="pointer-events-none select-none absolute inset-0 bg-clip-text text-transparent blur-2xl opacity-45 animate-aurora"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>

        {/* Crisp foreground text */}
        <span
          className="relative inline-block bg-clip-text text-transparent animate-aurora"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";

