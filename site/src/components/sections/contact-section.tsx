"use client";

import { profile } from "@/content/profile";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080706] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(232,180,184,0.12),transparent)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-10 text-center shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-16"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/45">
            Contact
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Let&apos;s build reliable releases
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
            Open to conversations about DevSecOps, secure CI/CD, and
            mission-driven engineering.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <Link
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#1a1816] transition-transform hover:scale-[1.02]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {profile.email}
            </Link>
            <a
              href={`tel:${profile.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {profile.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
