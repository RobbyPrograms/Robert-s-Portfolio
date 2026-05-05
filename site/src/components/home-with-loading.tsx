"use client";

import { LoadingScreen } from "@/components/loading-screen";
import { PortfolioPage } from "@/components/portfolio-page";
import { shouldUseLiteEffects } from "@/lib/mobile-performance";
import { useEffect, useState } from "react";

export function HomeWithLoading() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || shouldUseLiteEffects()) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onEnter={() => setLoaded(true)} />}
      {loaded ? <PortfolioPage /> : null}
    </>
  );
}
