import { cn } from "@/lib/utils";

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]",
        className,
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(34,211,238,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(34,211,238,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }}
    />
  );
}
