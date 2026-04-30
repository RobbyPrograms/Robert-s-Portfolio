"use client";

import { profile } from "@/content/profile";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.06] bg-[#0c0b0a] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a78bfa]/90">
            Skills & tooling
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Built for pipelines and platforms
          </h2>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {profile.skillGroups.map((g) => (
            <motion.div
              key={g.title}
              variants={item}
              className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-6 shadow-inner shadow-black/20"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {g.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/[0.08] bg-black/30 px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {profile.certifications.map((c) => (
            <span
              key={c}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-4 py-2 text-xs font-medium text-cyan-100/95"
            >
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
