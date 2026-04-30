import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Robert Rolison · DevSecOps Engineer",
  description:
    "DevSecOps Engineer — CI/CD, Azure DevOps, Kubernetes runners, and secure delivery for DoD programs.",
  openGraph: {
    title: "Robert Rolison · DevSecOps Engineer",
    description:
      "Portfolio of Robert Rolison — Deloitte, U.S. Army AIE, secure CI/CD and release management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[#050508] text-[#f4f4f8] antialiased">
        {children}
      </body>
    </html>
  );
}
