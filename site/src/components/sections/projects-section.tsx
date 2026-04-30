"use client";

import { projects } from "@/content/projects";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative border-t border-cyan-400/10 bg-[#050508] px-6 py-28 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_20%_30%,rgba(249,115,22,0.06),transparent_50%),radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-fuchsia-300/90">
            Projects
          </p>
          <h2 className="mt-4 bg-gradient-to-br from-white via-white to-cyan-100/70 bg-clip-text font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-transparent md:text-4xl lg:text-5xl">
            Things I ship on the side
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
            Personal builds that pair the same rigor as production work with
            experimentation—APIs, ML, data, and polished product surfaces.
          </p>
        </motion.div>

        <ul className="space-y-10">
          {projects.map((project, i) => {
            const isTech = project.preview.variant === "tech";
            return (
              <motion.li
                key={project.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/[0.04] shadow-[0_0_70px_-22px_rgba(34,211,238,0.3),0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:rounded-3xl"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    background: isTech
                      ? "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, transparent 40%, rgba(34,211,238,0.08) 55%, rgba(232,121,249,0.06) 100%)"
                      : "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, transparent 40%, rgba(34,211,238,0.08) 55%, rgba(232,121,249,0.06) 100%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-55"
                  style={{
                    background: isTech
                      ? "linear-gradient(125deg, rgba(167,139,250,0.4), rgba(34,211,238,0.3), rgba(232,121,249,0.35))"
                      : "linear-gradient(125deg, rgba(34,211,238,0.45), rgba(249,115,22,0.25), rgba(232,121,249,0.35))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: 1,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-10 p-8 md:flex-row md:items-stretch md:gap-12 md:p-10 lg:p-12">
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-200/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                      {project.title}
                      <span className="block text-lg font-normal text-fuchsia-200/90 md:text-xl">
                        {project.subtitle}
                      </span>
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                      {project.description}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-400 px-7 py-3.5 text-sm font-semibold text-[#0a0a0c] shadow-[0_0_32px_rgba(34,211,238,0.4)] transition-transform group-hover:scale-[1.02] hover:shadow-[0_0_44px_rgba(34,211,238,0.55)]"
                    >
                      Open live app
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mx-auto w-full max-w-md shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-inner shadow-black/50 md:mx-0 md:max-w-sm md:self-center lg:max-w-md"
                    aria-label={`Preview ${project.title}`}
                  >
                    <div className="flex items-center gap-2 border-b border-white/[0.08] bg-black/40 px-3 py-2.5">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/[0.06] bg-black/50 px-3 py-1.5 text-[11px] text-white/45">
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                        <span className="truncate font-mono text-[10px] text-cyan-200/70 sm:text-[11px]">
                          {project.preview.host}
                        </span>
                      </div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isTech
                            ? "radial-gradient(ellipse at 30% 20%, rgba(167,139,250,0.35), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.28), transparent 50%), linear-gradient(180deg, #0c0c12 0%, #050508 100%)"
                            : "radial-gradient(ellipse at 30% 20%, rgba(249,115,22,0.35), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.25), transparent 50%), linear-gradient(180deg, #0c0c10 0%, #050508 100%)",
                        }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
                      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
                        <p
                          className={
                            isTech
                              ? "text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90"
                              : "text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/90"
                        }
                        >
                          {project.preview.eyebrow}
                        </p>
                        <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl">
                          {project.preview.displayName}
                        </p>
                        <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-white/55">
                          {project.preview.tagline}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-cyan-200">
                          Live
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
