"use client";

import { useEffect } from "react";

const BASE = "Robert Rolison · DevSecOps Engineer";

const SECTION_TITLES: Record<string, string> = {
  "": BASE,
  "#": BASE,
  "#top": BASE,
  "#about": "About · Robert Rolison",
  "#experience": "Experience · Robert Rolison",
  "#skills": "Skills · Robert Rolison",
  "#projects": "Projects · Robert Rolison",
  "#contact": "Contact · Robert Rolison",
};

function syncTitle() {
  if (typeof document === "undefined") return;
  const hash = window.location.hash || "";
  document.title = SECTION_TITLES[hash] ?? BASE;
}

export function DocumentTitle() {
  useEffect(() => {
    syncTitle();

    const onHash = () => syncTitle();
    window.addEventListener("hashchange", onHash);

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (el) requestAnimationFrame(() => requestAnimationFrame(syncTitle));
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
