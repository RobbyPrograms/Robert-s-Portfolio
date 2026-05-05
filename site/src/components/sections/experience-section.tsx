"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { profile } from "@/content/profile";
import { shouldUseLiteEffects } from "@/lib/mobile-performance";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function ExperienceSection() {
  const liteFx = shouldUseLiteEffects();
  return (
    <section
      id="experience"
      className="relative bg-[#050508] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/90">
            Experience
          </p>
          <h2 className="mt-4 bg-gradient-to-br from-white via-white to-cyan-100/80 bg-clip-text font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-transparent md:text-4xl lg:text-5xl">
            What I have built at Deloitte
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
              className={`group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/[0.04] p-8 md:rounded-3xl md:p-10 ${
                liteFx
                  ? "shadow-[0_0_28px_-16px_rgba(34,211,238,0.2),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                  : "shadow-[0_0_60px_-20px_rgba(34,211,238,0.25),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              }`}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-80"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(34,211,238,0.08) 0%, transparent 45%, rgba(232,121,249,0.06) 100%)",
                }}
              />
              <div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(232,121,249,0.2), rgba(167,139,250,0.3))",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: 1,
                }}
              />
              {!liteFx && <BorderBeam duration={14 + i * 2} />}
              <div className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Building2
                        className="h-4 w-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        aria-hidden
                      />
                      <span className="text-sm font-medium">{job.company}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-white/55">
                      {job.location} · {job.period}
                    </p>
                    <p className="mt-2 text-sm text-fuchsia-200/85">{job.note}</p>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 border-t border-cyan-400/15 pt-8">
                  {job.highlights.map((h) => (
                    <li
                      key={h.slice(0, 48)}
                      className="flex gap-3 text-sm leading-relaxed text-white/70 md:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
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
          className={`mt-12 rounded-2xl border border-dashed border-cyan-400/25 bg-white/[0.03] px-6 py-8 md:px-8 ${
            liteFx
              ? "shadow-[0_0_18px_-10px_rgba(167,139,250,0.12)] backdrop-blur-sm"
              : "shadow-[0_0_40px_-15px_rgba(167,139,250,0.15)] backdrop-blur-xl"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-200/50">
            Earlier roles
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {profile.previousRoles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
