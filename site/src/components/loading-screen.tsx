"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "ROBERT ROLISON";

type LoadingScreenProps = {
  onEnter?: () => void;
};

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showEnter, setShowEnter] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (displayed.length < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setShowEnter(true), 500);
    return () => clearTimeout(timeout);
  }, [displayed]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((value) => !value), 530);
    return () => clearInterval(interval);
  }, []);

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
    setTimeout(() => {
      onEnter?.();
    }, 700);
  };

  return (
    <div
      onClick={handleEnter}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.16), transparent 40%), radial-gradient(circle at 82% 82%, rgba(232,121,249,0.14), transparent 42%), var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: showEnter ? "pointer" : "default",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s ease",
        zIndex: 9999,
        userSelect: "none",
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
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          animation: "gridDrift 16s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 3px, transparent 6px)",
          mixBlendMode: "screen",
          opacity: showEnter ? 0.42 : 0.24,
          animation: "scanlineShift 6s linear infinite",
        }}
      />

      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((corner) => (
        <div
          key={corner}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            ...(corner === "topLeft" && {
              top: 32,
              left: 32,
              borderTop: "1px solid rgba(34,211,238,0.5)",
              borderLeft: "1px solid rgba(34,211,238,0.5)",
            }),
            ...(corner === "topRight" && {
              top: 32,
              right: 32,
              borderTop: "1px solid rgba(34,211,238,0.5)",
              borderRight: "1px solid rgba(34,211,238,0.5)",
            }),
            ...(corner === "bottomLeft" && {
              bottom: 32,
              left: 32,
              borderBottom: "1px solid rgba(34,211,238,0.5)",
              borderLeft: "1px solid rgba(34,211,238,0.5)",
            }),
            ...(corner === "bottomRight" && {
              bottom: 32,
              right: 32,
              borderBottom: "1px solid rgba(34,211,238,0.5)",
              borderRight: "1px solid rgba(34,211,238,0.5)",
            }),
          }}
        />
      ))}

      <div
        style={{
          textAlign: "center",
          padding: "32px 28px",
          borderRadius: 24,
          border: "1px solid rgba(34,211,238,0.25)",
          background: "rgba(255,255,255,0.05)",
          boxShadow:
            "0 0 80px -20px rgba(34,211,238,0.45), 0 25px 80px -30px rgba(232,121,249,0.25)",
          backdropFilter: "blur(14px)",
          maxWidth: 760,
          width: "min(92vw, 760px)",
          animation: "floatCard 5.5s ease-in-out infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-35% -60%",
            background:
              "linear-gradient(115deg, transparent 40%, rgba(34,211,238,0.22) 50%, transparent 60%)",
            transform: "translateX(-40%)",
            animation: "sweepGlow 3.8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(165,243,252,0.7)",
            marginBottom: 24,
            opacity: displayed.length > 0 ? 1 : 0,
            transition: "opacity 0.4s ease",
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
            textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            position: "relative",
            animation: showEnter ? "titleSurge 2.2s ease-in-out infinite" : "none",
          }}
        >
          {displayed}
          <span
            style={{
              opacity: showCursor ? 1 : 0,
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
            marginTop: 48,
            fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
            fontSize: 13,
            letterSpacing: "0.25em",
            color: showEnter ? "rgba(244,244,248,0.62)" : "transparent",
            transition: "color 0.6s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            animation: showEnter ? "enterPulse 1.8s ease-in-out infinite" : "none",
          }}
        >
          <span style={{ color: "rgba(34,211,238,0.72)" }}>[</span>
          &nbsp;ENTER&nbsp;
          <span style={{ color: "rgba(34,211,238,0.72)" }}>]</span>
        </div>

        {showEnter && (
          <div
            style={{
              marginTop: 12,
              fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(244,244,248,0.3)",
              animation: "fadePulse 2s ease infinite",
            }}
          >
            tap anywhere
          </div>
        )}
      </div>

      <style>{`
        @keyframes gridDrift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(40px, 40px, 0); }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes sweepGlow {
          0% { transform: translateX(-44%) rotate(0.001deg); opacity: 0; }
          16% { opacity: 0.9; }
          42% { opacity: 0.18; }
          100% { transform: translateX(44%) rotate(0.001deg); opacity: 0; }
        }

        @keyframes scanlineShift {
          0% { transform: translateY(0); }
          100% { transform: translateY(24px); }
        }

        @keyframes titleSurge {
          0%, 100% { transform: translateY(0); text-shadow: 0 2px 24px rgba(0,0,0,0.35); }
          50% { transform: translateY(-2px); text-shadow: 0 0 20px rgba(34,211,238,0.42), 0 2px 24px rgba(0,0,0,0.35); }
        }

        @keyframes enterPulse {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 1; }
        }

        @keyframes fadePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
