"use client";

import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { shouldUseLightweightMotion } from "@/lib/mobile-performance";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

export function PortfolioPage() {
  const bridgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (shouldUseLightweightMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const el = bridgeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0.5, y: 32 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 72%",
            scrub: 1,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <Navigation />
      <HeroSection />
      <div ref={bridgeRef} className="relative bg-[#060508]">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </SmoothScrollProvider>
  );
}
