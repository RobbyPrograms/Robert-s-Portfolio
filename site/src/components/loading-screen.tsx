"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "ROBERT ROLISON";

type LoadingScreenProps = {
  onEnter?: () => void;
};

/**
 * Lightweight intro: no full-viewport filters, no mix-blend, at most one subtle CSS loop.
 * Pauses decorative motion when the tab is in the background.
 */
export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [displayed, setDisplayed] = useState("");
  const [showEnter, setShowEnter] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const onVis = () => {
      const hidden = document.hidden;
      setTabHidden(hidden);
      document.documentElement.classList.toggle("tab-inactive", hidden);
    };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (displayed.length < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
      }, 72);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setShowEnter(true), 320);
    return () => clearTimeout(timeout);
  }, [displayed]);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  const handleEnter = () => {
    if (!showEnter || exiting) return;
    setExiting(true);
    window.setTimeout(() => {
      onEnter?.();
    }, 380);
  };

  const motionPaused = tabHidden ? "paused" : "running";

  return (
    <div
      data-loading-screen=""
      data-motion-paused={tabHidden ? "true" : "false"}
      onClick={handleEnter}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.12), transparent 42%), radial-gradient(circle at 82% 82%, rgba(232,121,249,0.1), transparent 44%), var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: showEnter ? "pointer" : "default",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.38s ease",
        zIndex: 9999,
        userSelect: "none",
        contain: "strict",
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleEnter();
        }
      }}
      aria-label="Enter portfolio"
    >
      <div
        style={{
          textAlign: "center",
          padding: "28px 24px",
          borderRadius: 20,
          border: "1px solid rgba(34,211,238,0.22)",
          background: "rgba(8,8,12,0.92)",
          boxShadow:
            "0 0 48px -18px rgba(34,211,238,0.35), 0 18px 48px -28px rgba(232,121,249,0.2)",
          maxWidth: 720,
          width: "min(92vw, 720px)",
          position: "relative",
          overflow: "hidden",
          animationPlayState: motionPaused as "paused" | "running",
          animation: tabHidden ? "none" : "loadingCardReveal 0.85s ease-out both",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(165,243,252,0.65)",
            marginBottom: 20,
            opacity: displayed.length > 0 ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          PORTFOLIO_v2026
        </div>

        <div
          style={{
            fontFamily: "var(--font-display), var(--font-geist-sans), serif",
            fontSize: "clamp(28px, 8vw, 56px)",
            fontWeight: 600,
            color: "var(--foreground)",
            letterSpacing: "0.08em",
            lineHeight: 1,
            minHeight: "1.2em",
            textShadow: "0 2px 20px rgba(0,0,0,0.35)",
          }}
        >
          {displayed}
          <span
            aria-hidden
            className="loading-caret"
            style={{
              color: "var(--neon-cyan)",
              fontWeight: 100,
              marginLeft: 2,
            }}
          >
            |
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
            fontSize: 13,
            letterSpacing: "0.25em",
            color: showEnter ? "rgba(244,244,248,0.58)" : "transparent",
            transition: "color 0.45s ease",
          }}
        >
          <span style={{ color: "rgba(34,211,238,0.65)" }}>[</span>
          &nbsp;ENTER&nbsp;
          <span style={{ color: "rgba(34,211,238,0.65)" }}>]</span>
        </div>

        {showEnter && (
          <div
            className="loading-hint"
            style={{
              marginTop: 10,
              fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(244,244,248,0.28)",
              animationPlayState: motionPaused as "paused" | "running",
              animation: "loadingHintPulse 2.4s ease-in-out infinite",
            }}
          >
            tap anywhere
          </div>
        )}
      </div>

      <style>{`
        @keyframes loadingCardReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadingCaretBlink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes loadingHintPulse {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.55; }
        }
        .loading-caret {
          display: inline-block;
          animation: loadingCaretBlink 1.1s step-end infinite;
        }
        [data-loading-screen][data-motion-paused="true"] .loading-caret,
        [data-loading-screen][data-motion-paused="true"] .loading-hint {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
