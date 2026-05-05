"use client";

import { shouldUseLiteEffects } from "@/lib/mobile-performance";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
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
  const tickRef = useRef<((time: number) => void) | null>(null);
  const [effectiveLite, setEffectiveLite] = useState(false);
  const [scrollMotionReady, setScrollMotionReady] = useState(false);

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

  // Lite mode + FPS probe finish before attaching Lenis (avoids stacking cost on weak GPUs).
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    if (shouldUseLiteEffects()) {
      root.classList.add("lite-effects");
      setEffectiveLite(true);
      setScrollMotionReady(true);
      return;
    }

    root.classList.remove("lite-effects");

    let frames = 0;
    const start = performance.now();
    let raf = 0;

    const sample = (t: number) => {
      frames += 1;
      if (frames < 24) {
        raf = requestAnimationFrame(sample);
        return;
      }
      const avgMs = (t - start) / frames;
      if (avgMs > 22) {
        root.classList.add("lite-effects");
        setEffectiveLite(true);
      }
      setScrollMotionReady(true);
    };

    raf = requestAnimationFrame(sample);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!scrollMotionReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (effectiveLite) return;

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
    tickRef.current = onTick;
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      tickRef.current = null;
      lenisRef.current = null;
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [scrollMotionReady, effectiveLite]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onVis = () => {
      const hidden = document.hidden;
      document.documentElement.classList.toggle("tab-inactive", hidden);

      const tick = tickRef.current;
      const lenis = lenisRef.current;

      if (hidden) {
        if (tick) gsap.ticker.remove(tick);
        lenis?.stop();
        gsap.globalTimeline.pause();
        return;
      }

      if (tick) gsap.ticker.add(tick);
      lenis?.start();
      gsap.globalTimeline.resume();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    document.addEventListener("visibilitychange", onVis);
    onVis();

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.documentElement.classList.remove("tab-inactive");
      gsap.globalTimeline.resume();
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
