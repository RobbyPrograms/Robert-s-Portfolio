"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export function Spotlight({
  className,
  fill = "rgba(34, 211, 238, 0.18)",
}: {
  className?: string;
  fill?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [x, y]);

  const background = useMotionTemplate`
    radial-gradient(620px circle at ${x}px ${y}px, ${fill}, rgba(232, 121, 249, 0.1) 38%, transparent 58%)
  `;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-500",
        className,
      )}
      style={{ background }}
    />
  );
}
