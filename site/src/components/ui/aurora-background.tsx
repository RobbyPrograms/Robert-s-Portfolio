"use client";

import { cn } from "@/lib/utils";
import { useLightweightMotion } from "@/lib/mobile-performance";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Static layers only — no continuous JS animation (mobile / low-power). */
function AuroraStatic() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-[20%] top-[-10%] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.38)_0%,transparent_62%)] blur-[80px]" />
      <div className="absolute -right-[15%] top-[15%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,121,249,0.3)_0%,transparent_62%)] blur-[80px]" />
      <div className="absolute bottom-[-5%] left-[20%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.22)_0%,transparent_68%)] blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.75)_100%)]" />
    </div>
  );
}

/** Desktop: subtle motion (fewer repaints than 4 simultaneous springs). */
function AuroraAnimated() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      <motion.div
        className="absolute -left-[20%] top-[-10%] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.42)_0%,transparent_62%)] blur-[78px]"
        animate={{ x: [0, 20, 0], y: [0, 14, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[15%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,121,249,0.34)_0%,transparent_62%)] blur-[78px]"
        animate={{ x: [0, -16, 0], y: [0, 20, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.75)_100%)]" />
    </div>
  );
}

export function AuroraBackground({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const lightweightMotion = useLightweightMotion();
  const [effectsReady, setEffectsReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEffectsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#050508]",
        className,
      )}
    >
      {effectsReady ? <AuroraStatic /> : null}
      {effectsReady && !lightweightMotion ? <AuroraAnimated /> : null}
      <div className="relative isolate">{children}</div>
    </div>
  );
}
