"use client";

import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  duration = 12,
}: {
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-60",
        className,
      )}
    >
      <div
        className="absolute -inset-full opacity-80"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(232,180,184,0.9) 60deg, rgba(201,169,98,0.7) 120deg, rgba(167,139,250,0.6) 200deg, transparent 280deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
