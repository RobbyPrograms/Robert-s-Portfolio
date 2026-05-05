/** True for phones / tablets where Lenis + heavy scroll FX hurt more than they help. */
export function shouldUseLightweightMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/** Heuristic for older/low-power desktops and laptops. */
export function isLowPowerDesktop(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  // Slightly conservative thresholds so older office laptops/desktops get relief.
  const lowThreads = (nav.hardwareConcurrency ?? 8) <= 6;
  const lowMemory = (nav.deviceMemory ?? 8) <= 8;
  const saveData = Boolean(nav.connection?.saveData);
  return lowThreads || lowMemory || saveData;
}

/** Unified gate for expensive visual effects. */
export function shouldUseLiteEffects(): boolean {
  if (typeof window === "undefined") return false;
  return shouldUseLightweightMotion() || isLowPowerDesktop();
}
