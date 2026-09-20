import { cn } from "@tech-tutor/utils/cn";

/**
 * Renders `` `inline code` ``. Kept tiny so it can be used inside headings.
 */
export function CodeInline({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.875em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
        className,
      )}
    >
      {children}
    </code>
  );
}
