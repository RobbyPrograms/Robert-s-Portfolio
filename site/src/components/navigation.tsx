"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navigation({ className }: { className?: string }) {
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
        <Link
          href="#top"
          className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold tracking-tight text-white shadow-[0_0_20px_rgba(34,211,238,0.25)] sm:mr-1 sm:px-4 sm:text-sm"
        >
          RR
        </Link>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-full px-3 py-2 text-xs text-white/65 transition-colors hover:bg-cyan-400/10 hover:text-cyan-100 sm:px-4 sm:text-sm"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
