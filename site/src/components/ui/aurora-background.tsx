"use client";

import { cn } from "@/lib/utils";
import { shouldUseLiteEffects } from "@/lib/mobile-performance";
import { motion } from "framer-motion";

/** Static layers only — no continuous JS animation (mobile / low-power). */
function AuroraStatic({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute -left-[20%] top-[-10%] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.38)_0%,transparent_62%)] blur-[80px]" />
      <div className="absolute -right-[15%] top-[15%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,121,249,0.3)_0%,transparent_62%)] blur-[80px]" />
      <div className="absolute bottom-[-5%] left-[20%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.22)_0%,transparent_68%)] blur-[70px]" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.75)_100%)]" />
    </div>
  );
}

/** Desktop: subtle motion (fewer repaints than 4 simultaneous springs). */
function AuroraAnimated() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      <motion.div
        className="absolute -left-[20%] top-[-10%] h-[75vh] w-[75vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.45)_0%,transparent_62%)] blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[15%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,121,249,0.38)_0%,transparent_62%)] blur-[100px]"
        animate={{ x: [0, -24, 0], y: [0, 32, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-5%] left-[20%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.32)_0%,transparent_68%)] blur-[90px]"
        animate={{ opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
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
  const liteFx = shouldUseLiteEffects();
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#050508]",
        className,
      )}
    >
      {liteFx ? <AuroraStatic /> : <AuroraStatic className="md:hidden" />}
      {!liteFx && <AuroraAnimated />}
      <div className="relative isolate">{children}</div>
    </div>
  );
}
