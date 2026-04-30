"use client";

import { useScrollToTop } from "@/components/scroll-control";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const SECTION_IDS = [
  "top",
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

const links = [
  { id: "about" as const, href: "#about", label: "About" },
  { id: "experience" as const, href: "#experience", label: "Experience" },
  { id: "skills" as const, href: "#skills", label: "Skills" },
  { id: "projects" as const, href: "#projects", label: "Projects" },
  { id: "contact" as const, href: "#contact", label: "Contact" },
];

const activeBubble =
  "bg-cyan-400/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/35";

const inactiveNav =
  "text-white/65 hover:bg-cyan-400/10 hover:text-cyan-100";

export function Navigation({ className }: { className?: string }) {
  const scrollToTop = useScrollToTop();
  const [activeId, setActiveId] = useState<string>("top");

  const computeActiveFromScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const line = window.innerHeight * 0.28 + 56;
    let active = "top";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= line) {
        active = id;
      }
    }
    setActiveId(active);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        computeActiveFromScroll();
      });
    };

    computeActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [computeActiveFromScroll]);

  useEffect(() => {
    const fromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (raw === "" || raw === "top") setActiveId("top");
      else if (SECTION_IDS.includes(raw as (typeof SECTION_IDS)[number])) {
        setActiveId(raw);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (!(a instanceof HTMLAnchorElement)) return;
      const id = a.getAttribute("href")?.replace(/^#/, "");
      if (id === "top" || id === "") setActiveId("top");
      else if (id && SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) {
        setActiveId(id);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-4 sm:pt-6",
        className,
      )}
    >
      <nav
        className="scrollbar-none flex max-w-[min(100%,42rem)] items-center gap-0.5 overflow-x-auto rounded-full border border-cyan-400/25 bg-white/[0.06] px-1.5 py-1.5 shadow-[0_0_40px_-8px_rgba(34,211,238,0.35),0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:max-w-none sm:gap-1 sm:px-2 sm:py-2"
        aria-label="Primary"
      >
        <button
          type="button"
          onClick={() => {
            scrollToTop();
            setActiveId("top");
          }}
          aria-label="Back to top"
          aria-current={activeId === "top" ? "page" : undefined}
          className={cn(
            "shrink-0 rounded-full px-3 py-2 text-xs font-semibold tracking-tight transition-colors sm:mr-1 sm:px-4 sm:text-sm",
            activeId === "top" ? activeBubble : inactiveNav,
          )}
        >
          RR
        </button>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={activeId === l.id ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm",
              activeId === l.id ? activeBubble : inactiveNav,
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
