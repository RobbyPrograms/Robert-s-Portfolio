"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { GridPattern } from "@/components/ui/grid-pattern";
import { profile } from "@/content/profile";
import { useLightweightMotion } from "@/lib/mobile-performance";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const lightweightMotion = useLightweightMotion();
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIntroReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    // Pinned hero + blur scrub can tank weaker compositors; keep native scroll there.
    if (lightweightMotion) return;
    if (!introReady) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    const ctx = gsap.context(() => {
      gsap.to(layer, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.05,
        },
        yPercent: -5,
        opacity: 0.85,
        scale: 0.985,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, [introReady, lightweightMotion, reduceMotion]);

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
          </div>
          <div
            className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-center px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[calc(5.25rem+env(safe-area-inset-top))] sm:px-8 md:px-12 lg:px-16"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-white/[0.05] p-6 shadow-[0_0_80px_-20px_rgba(34,211,238,0.5),0_25px_80px_-30px_rgba(232,121,249,0.25)] sm:rounded-3xl sm:p-8 md:p-10",
                  lightweightMotion ? "backdrop-blur-sm md:backdrop-blur-md" : "backdrop-blur-md md:backdrop-blur-2xl",
                )}
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
                    initial={false}
                    animate={introReady ? { opacity: [1, 0.92, 1] } : undefined}
                    transition={{ duration: 0.9, ease: "easeOut" }}
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
                          initial={false}
                          animate={introReady ? { y: [2, 0], opacity: [0.9, 1] } : undefined}
                          transition={{
                            duration: 0.55,
                            delay: 0.06 + i * 0.04,
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
                    initial={false}
                    animate={introReady ? { y: [6, 0], opacity: [0.92, 1] } : undefined}
                    transition={{
                      duration: 0.55,
                      delay: 0.2,
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
                    initial={false}
                    animate={introReady ? { y: [6, 0], opacity: [0.94, 1] } : undefined}
                    transition={{ duration: 0.5, delay: 0.28 }}
                  >
                    <Link
                      href="#experience"
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 px-8 py-3.5 text-sm font-semibold text-[#0a0a0c] shadow-[0_0_32px_rgba(34,211,238,0.45)] transition-transform hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(34,211,238,0.55)] active:scale-[0.98]"
                    >
                      View experience
                    </Link>
                    <Link
                      href="#contact"
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-cyan-400/35 bg-white/[0.06] px-8 py-3.5 text-sm font-medium text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm transition-colors hover:border-fuchsia-400/45 hover:bg-white/[0.1] hover:text-white md:backdrop-blur-md"
                    >
                      Get in touch
                    </Link>
                  </motion.div>
                  <motion.div
                    className="mt-8 flex justify-center sm:mt-10 sm:justify-start"
                    initial={false}
                    animate={introReady ? { opacity: [0.92, 1] } : undefined}
                    transition={{ delay: 0.34, duration: 0.45 }}
                  >
                    <Link
                      href="#about"
                      className="group flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200/50 transition-colors hover:text-cyan-100 sm:gap-2 sm:text-xs sm:tracking-widest"
                      aria-label="Scroll to about"
                    >
                      <span>Scroll</span>
                      <motion.span
                        className="max-md:hidden"
                        animate={lightweightMotion ? undefined : { y: [0, 5, 0] }}
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
