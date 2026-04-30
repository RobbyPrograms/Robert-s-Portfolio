import { profile } from "@/content/profile";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#060505] px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-sm text-white/45 md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Crafted with Next.js,
          GSAP & Framer Motion.
        </p>
        <div className="flex gap-6">
          <Link
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-white/80"
          >
            Email
          </Link>
          <Link href="#top" className="transition-colors hover:text-white/80">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
