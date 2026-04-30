"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { profile } from "@/content/profile";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-[#080706] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-fuchsia-300/90">
            Experience
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Where shipping meets security
          </h2>
        </motion.div>
        <div className="space-y-10">
          {profile.experience.map((job, i) => (
            <motion.article
              key={job.company + job.period}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-10"
            >
              <BorderBeam duration={14 + i * 2} />
              <div className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-300/95">
                      <Building2 className="h-4 w-4" aria-hidden />
                      <span className="text-sm font-medium">{job.company}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      {job.location} · {job.period}
                    </p>
                    <p className="mt-2 text-sm text-violet-300/90">{job.note}</p>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-8">
                  {job.highlights.map((h) => (
                    <li
                      key={h.slice(0, 48)}
                      className="flex gap-3 text-sm leading-relaxed text-white/65 md:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400"
                        aria-hidden
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-8 md:px-8"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            Earlier roles
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            {profile.previousRoles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
