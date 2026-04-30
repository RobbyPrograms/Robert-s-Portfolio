/** True for phones / tablets where Lenis + heavy scroll FX hurt more than they help. */
export function shouldUseLightweightMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}
