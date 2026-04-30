"use client";

import { shouldUseLightweightMotion } from "@/lib/mobile-performance";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

const ScrollControlContext = createContext<{
  scrollToTop: () => void;
} | null>(null);

export function useScrollToTop() {
  const ctx = useContext(ScrollControlContext);
  return ctx?.scrollToTop ?? (() => {});
}

function snapHeroLayer() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  const layer = document.querySelector("[data-hero-scroll-layer]");
  if (!layer || window.scrollY > 12) return;
  gsap.set(layer, { clearProps: "transform,opacity,filter" });
  ScrollTrigger.refresh(true);
}

function finishScrollToTop() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.refresh(true);
  snapHeroLayer();
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;

    const path = window.location.pathname || "/";
    window.history.replaceState(null, "", path);

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: finishScrollToTop,
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(finishScrollToTop, 450);
    window.setTimeout(finishScrollToTop, 900);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (shouldUseLightweightMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      // Avoid fighting programmatic scrollTo + hash navigation
      anchors: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenisRef.current = null;
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  // Fix stuck hero when landing or restoring with #top in URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fixHashTop = () => {
      if (window.location.hash !== "#top") return;
      window.history.replaceState(null, "", window.location.pathname || "/");
      requestAnimationFrame(() => {
        if (window.scrollY < 12) snapHeroLayer();
      });
    };
    fixHashTop();
  }, []);

  const value = useMemo(() => ({ scrollToTop }), [scrollToTop]);

  return (
    <ScrollControlContext.Provider value={value}>
      {children}
    </ScrollControlContext.Provider>
  );
}
