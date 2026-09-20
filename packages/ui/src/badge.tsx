import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@tech-tutor/utils/cn";

const TONES = {
  Beginner: "bg-lime-500/10 text-lime-700 ring-lime-500/30 dark:text-lime-300",
  Intermediate: "bg-amber-500/10 text-amber-700 ring-amber-500/30 dark:text-amber-300",
  Advanced: "bg-rose-500/10 text-rose-700 ring-rose-500/30 dark:text-rose-300",
} as const;

export function Badge({
  level,
  className,
  ...props
}: { level?: keyof typeof TONES | string } & ComponentPropsWithoutRef<"span">) {
  if (!level) return null;
  const tone = TONES[level as keyof typeof TONES] ?? TONES.Beginner;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        tone,
        className,
      )}
      {...props}
    >
      {level}
    </span>
  );
}
