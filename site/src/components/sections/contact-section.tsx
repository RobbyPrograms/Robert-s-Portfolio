"use client";

import { profile } from "@/content/profile";
import { shouldUseLiteEffects } from "@/lib/mobile-performance";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  const liteFx = shouldUseLiteEffects();
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050508] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(ellipse_60%_40%_at_80%_90%,rgba(232,121,249,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-white/[0.04] p-10 text-center md:rounded-[2rem] md:p-16 ${
            liteFx
              ? "shadow-[0_0_24px_-14px_rgba(34,211,238,0.2),0_10px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm"
              : "shadow-[0_0_80px_-25px_rgba(34,211,238,0.35),0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90"
            style={{
              background:
                "linear-gradient(165deg, rgba(34,211,238,0.1) 0%, transparent 42%, rgba(232,121,249,0.08) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.4), rgba(232,121,249,0.25), rgba(167,139,250,0.35))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: 1,
            }}
          />
          <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/85">
              Contact
            </p>
            <h2 className="mt-6 bg-gradient-to-br from-white via-white to-cyan-100/75 bg-clip-text font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-transparent md:text-5xl">
              Let&apos;s build reliable releases
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              Open to conversations about DevSecOps, secure CI/CD, and
              mission-driven engineering.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <Link
                href={`mailto:${profile.email}`}
                className={`inline-flex min-h-[52px] w-full max-w-md items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 px-8 py-4 text-sm font-semibold text-[#0a0a0c] transition-transform sm:w-auto ${
                  liteFx
                    ? "shadow-[0_0_14px_rgba(34,211,238,0.3)]"
                    : "shadow-[0_0_36px_rgba(34,211,238,0.45)] hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(34,211,238,0.55)]"
                }`}
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{profile.email}</span>
              </Link>
              <a
                href={`tel:${profile.phone.replace(/\D/g, "")}`}
                className={`inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-cyan-400/35 bg-white/[0.06] px-8 py-4 text-sm font-medium text-cyan-50 transition-colors ${
                  liteFx
                    ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-none"
                    : "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md hover:border-fuchsia-400/40 hover:bg-white/[0.1] hover:text-white"
                }`}
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  aria-hidden
                />
                {profile.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
