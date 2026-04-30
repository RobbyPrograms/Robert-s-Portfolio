import { useSyncExternalStore } from "react";

let cachedLightweightMotion: boolean | null = null;
let runtimeLightweightMotion = false;
let runtimeProbeStarted = false;
const listeners = new Set<() => void>();

/**
 * Enables a lighter animation path for devices that are likely to drop frames.
 * Includes mobile/tablet plus lower-power laptops/desktops.
 */
export function shouldUseLightweightMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedLightweightMotion !== null) return cachedLightweightMotion;

  const isMobileLike =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  const cpuThreads = navigator.hardwareConcurrency ?? 8;
  const lowCpu = cpuThreads <= 4;
  const midCpuLaptop = cpuThreads <= 8;

  type NavWithMemory = Navigator & { deviceMemory?: number };
  const memory = (navigator as NavWithMemory).deviceMemory ?? 8;
  const lowMemory = memory <= 4;

  type NavWithConnection = Navigator & {
    connection?: { saveData?: boolean };
  };
  const conn =
    typeof navigator !== "undefined"
      ? (navigator as NavWithConnection).connection
      : undefined;
  const saveData = Boolean(conn?.saveData);

  const ua = navigator.userAgent || "";
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg/i.test(ua);
  const isMac = /Macintosh|Mac OS X/i.test(ua);
  const olderMacDesktop = isSafari && isMac && midCpuLaptop;

  cachedLightweightMotion =
    isMobileLike || lowCpu || lowMemory || saveData || olderMacDesktop;
  return cachedLightweightMotion;
}

function notifyListeners() {
  for (const listener of listeners) listener();
}

function setRuntimeLightweightMotion(value: boolean) {
  if (runtimeLightweightMotion === value) return;
  runtimeLightweightMotion = value;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("perf-lite", value);
  }
  notifyListeners();
}

function beginRuntimeProbe() {
  if (typeof window === "undefined" || runtimeProbeStarted) return;
  runtimeProbeStarted = true;

  const baseline = shouldUseLightweightMotion();
  setRuntimeLightweightMotion(baseline);

  // If baseline already says lightweight, no need to measure.
  if (baseline) return;

  const startProbe = () => {
    const samples = 45;
    let count = 0;
    let dropped = 0;
    let total = 0;
    let last = performance.now();

    const onFrame = (now: number) => {
      const dt = now - last;
      last = now;
      total += dt;
      if (dt > 22) dropped += 1;
      count += 1;
      if (count < samples) {
        requestAnimationFrame(onFrame);
        return;
      }
      const avg = total / samples;
      if (avg > 19 || dropped > 8) {
        setRuntimeLightweightMotion(true);
      }
    };

    requestAnimationFrame(onFrame);
  };

  window.setTimeout(startProbe, 1400);
}

/**
 * Hydration-safe value for components that branch during render.
 * Starts as false (matches SSR), then updates after mount.
 */
export function useLightweightMotion(): boolean {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      beginRuntimeProbe();
      return () => {
        listeners.delete(listener);
      };
    },
    () => shouldUseLightweightMotion() || runtimeLightweightMotion,
    () => false,
  );
}
