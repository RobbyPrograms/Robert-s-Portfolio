import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
