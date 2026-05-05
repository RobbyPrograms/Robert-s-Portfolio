"use client";

import { useScrollToTop } from "@/components/scroll-control";
import { shouldUseLightweightMotion, shouldUseLiteEffects } from "@/lib/mobile-performance";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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

function viewportHeight(): number {
  if (typeof window === "undefined") return 800;
  return window.visualViewport?.height ?? window.innerHeight;
}

export function Navigation({ className }: { className?: string }) {
  const scrollToTop = useScrollToTop();
  const liteFx = shouldUseLiteEffects();
  const [activeId, setActiveId] = useState<string>("top");
  /** Prevents scroll-spy from overwriting the tab you just tapped while the page scrolls (esp. mobile). */
  const navLockRef = useRef<{ id: string; until: number } | null>(null);
  const rafRef = useRef<number>(0);

  const armNavLock = useCallback((id: string) => {
    const isMobile = shouldUseLightweightMotion();
    const ms = isMobile ? 1600 : 900;
    navLockRef.current = { id, until: Date.now() + ms };
    setActiveId(id);
  }, []);

  const computeActiveFromScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const lock = navLockRef.current;
    if (lock && Date.now() < lock.until) {
      setActiveId(lock.id);
      return;
    }
    navLockRef.current = null;

    const line = viewportHeight() * 0.26 + 64;
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
    const schedule = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        computeActiveFromScroll();
      });
    };

    computeActiveFromScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", schedule, {
      passive: true,
    });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("scrollend", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scrollend", schedule);
    };
  }, [computeActiveFromScroll]);

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (raw === "" || raw === "top") {
        armNavLock("top");
      } else if (SECTION_IDS.includes(raw as (typeof SECTION_IDS)[number])) {
        armNavLock(raw);
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);

    const hrefToId = (href: string | null) => {
      if (!href?.startsWith("#")) return null;
      const id = href.slice(1);
      if (id === "" || id === "top") return "top";
      if (SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) return id;
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (!(a instanceof HTMLAnchorElement)) return;
      const id = hrefToId(a.getAttribute("href"));
      if (id) armNavLock(id);
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (!(a instanceof HTMLAnchorElement)) return;
      const id = hrefToId(a.getAttribute("href"));
      if (id) armNavLock(id);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("hashchange", applyHash);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [armNavLock]);

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
        className={`scrollbar-none flex max-w-[min(100%,42rem)] items-center gap-0.5 overflow-x-auto rounded-full border border-cyan-400/25 bg-white/[0.06] px-1.5 py-1.5 sm:max-w-none sm:gap-1 sm:px-2 sm:py-2 ${
          liteFx
            ? "shadow-[0_0_16px_-10px_rgba(34,211,238,0.25),0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            : "shadow-[0_0_40px_-8px_rgba(34,211,238,0.35),0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        }`}
        aria-label="Primary"
      >
        <button
          type="button"
          onPointerDown={() => armNavLock("top")}
          onClick={() => {
            scrollToTop();
            armNavLock("top");
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
