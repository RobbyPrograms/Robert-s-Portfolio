"use client";

import { profile } from "@/content/profile";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-white/[0.06] bg-[#0a0908] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/90">
            About
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Secure delivery at scale
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
            {profile.summary}
          </p>
          <dl className="mt-12 grid gap-8 border-t border-white/[0.06] pt-12 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/40">
                Clearance
              </dt>
              <dd className="mt-2 text-sm font-medium text-white/85">
                {profile.clearance}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/40">
                Education
              </dt>
              <dd className="mt-2 text-sm font-medium text-white/85">
                {profile.education.degree}
                <span className="mt-1 block text-white/50">
                  {profile.education.school} · {profile.education.date}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/40">
                Focus
              </dt>
              <dd className="mt-2 text-sm font-medium text-white/85">
                CI/CD · Kubernetes runners · Release management
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
