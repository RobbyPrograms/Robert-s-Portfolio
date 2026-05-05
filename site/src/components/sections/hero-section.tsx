"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { profile } from "@/content/profile";
import { shouldUseLiteEffects } from "@/lib/mobile-performance";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const liteFx = shouldUseLiteEffects();

  useLayoutEffect(() => {
    if (reduceMotion) return;
    // Pinned hero + blur scrub tanks mobile compositors; keep native scroll path.
    if (shouldUseLiteEffects()) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    const ctx = gsap.context(() => {
      gsap.to(layer, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=110%",
          scrub: 1.05,
          pin: true,
        },
        yPercent: -8,
        opacity: 0,
        scale: 0.97,
        filter: "blur(5px)",
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div
        ref={layerRef}
        data-hero-scroll-layer
        className="relative flex min-h-[100svh] md:will-change-transform"
      >
        <AuroraBackground className="flex min-h-[100svh] flex-1 flex-col">
          <div className="pointer-events-none absolute inset-0 z-0">
            <GridPattern />
            {/* Spotlight = extra full-screen blur work on small GPUs */}
            <div className="hidden md:block">
              <Spotlight />
            </div>
          </div>
          <div
            className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-center px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[calc(5.25rem+env(safe-area-inset-top))] sm:px-8 md:px-12 lg:px-16"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div
                className={`relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-white/[0.05] p-6 sm:rounded-3xl sm:p-8 md:p-10 ${
                  liteFx
                    ? "shadow-[0_0_26px_-16px_rgba(34,211,238,0.22),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                    : "shadow-[0_0_80px_-20px_rgba(34,211,238,0.5),0_25px_80px_-30px_rgba(232,121,249,0.25)] backdrop-blur-md md:backdrop-blur-2xl"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 42%, rgba(232,121,249,0.1) 100%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-70 max-md:opacity-50"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(232,121,249,0.25), rgba(167,139,250,0.35))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: 1,
                  }}
                />
                <div className="relative">
                  <motion.p
                    className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-200/80 sm:mb-4 sm:text-sm sm:tracking-[0.35em]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.08 }}
                  >
                    Portfolio
                  </motion.p>
                  <h1 className="font-[family-name:var(--font-display)] text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-5xl md:text-7xl lg:text-8xl">
                    {profile.name.split(" ").map((word, i) => (
                      <span
                        key={`${word}-${i}`}
                        className="inline-block overflow-hidden"
                      >
                        <motion.span
                          className="inline-block"
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: 0.9,
                            delay: 0.12 + i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {word}
                          {i === 0 ? "\u00A0" : ""}
                        </motion.span>
                      </span>
                    ))}
                  </h1>
                  <motion.div
                    className="mt-5 max-w-2xl sm:mt-6"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="text-lg font-medium leading-snug text-white/95 sm:text-xl md:text-2xl">
                      <GradientText>{profile.title}</GradientText>
                      <span className="text-fuchsia-200/50"> · </span>
                      <span className="text-white/80">{profile.location}</span>
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
                      {profile.tagline}
                    </p>
                  </motion.div>
                  <motion.div
                    className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.55 }}
                  >
                    <Link
                      href="#experience"
                      className={`inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 px-8 py-3.5 text-sm font-semibold text-[#0a0a0c] transition-transform active:scale-[0.98] ${
                        liteFx
                          ? "shadow-[0_0_14px_rgba(34,211,238,0.35)]"
                          : "shadow-[0_0_32px_rgba(34,211,238,0.45)] hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(34,211,238,0.55)]"
                      }`}
                    >
                      View experience
                    </Link>
                    <Link
                      href="#contact"
                      className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-cyan-400/35 bg-white/[0.06] px-8 py-3.5 text-sm font-medium text-cyan-50 transition-colors ${
                        liteFx
                          ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-none"
                          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm hover:border-fuchsia-400/45 hover:bg-white/[0.1] hover:text-white md:backdrop-blur-md"
                      }`}
                    >
                      Get in touch
                    </Link>
                  </motion.div>
                  <motion.div
                    className="mt-8 flex justify-center sm:mt-10 sm:justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.95, duration: 0.5 }}
                  >
                    <Link
                      href="#about"
                      className="group flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200/50 transition-colors hover:text-cyan-100 sm:gap-2 sm:text-xs sm:tracking-widest"
                      aria-label="Scroll to about"
                    >
                      <span>Scroll</span>
                      <motion.span
                        className="max-md:hidden"
                        animate={{ y: [0, 5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.span>
                      <span className="md:hidden" aria-hidden>
                        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </AuroraBackground>
      </div>
    </section>
  );
}
