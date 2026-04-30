"use client";

import { LoadingScreen } from "@/components/loading-screen";
import { PortfolioPage } from "@/components/portfolio-page";
import { useState } from "react";

export function HomeWithLoading() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onEnter={() => setLoaded(true)} />}
      <PortfolioPage />
    </>
  );
}
