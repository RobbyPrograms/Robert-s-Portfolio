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
        "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-25",
        className,
      )}
    >
      <div
        className="border-beam-motion absolute -inset-full max-md:opacity-30"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34,211,238,0.85) 55deg, rgba(232,121,249,0.75) 130deg, rgba(167,139,250,0.7) 210deg, rgba(34,211,238,0.4) 280deg, transparent 320deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
