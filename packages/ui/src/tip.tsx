import { cn } from "@tech-tutor/utils/cn";
import type { DocTip } from "@tech-tutor/types";

const TONE_STYLES = {
  info: "border-lime-500/40 bg-lime-500/5",
  warning: "border-amber-500/40 bg-amber-500/5",
  success: "border-emerald-500/40 bg-emerald-500/5",
} as const;

const TONE_ICON: Record<string, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9.25 9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 9.25 9Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5.5Zm0 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export function Tip({
  block,
  className,
}: {
  block: DocTip;
  className?: string;
}) {
  const tone = block.tone ?? "info";
  return (
    <aside
      className={cn(
        "my-5 rounded-xl border-l-4 px-4 py-3",
        TONE_STYLES[tone],
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className={cn("mt-0.5 flex-none", TONE_ICON_COLOR[tone])}>
          {TONE_ICON[tone]}
        </span>
        <div className="min-w-0">
          {block.title ? (
            <p className="mb-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
              {block.title}
            </p>
          ) : null}
          <p className="text-[14px] text-zinc-700 dark:text-zinc-300">
            {block.text}
          </p>
        </div>
      </div>
    </aside>
  );
}

const TONE_ICON_COLOR: Record<string, string> = {
  info: "text-lime-500",
  warning: "text-amber-500",
  success: "text-emerald-500",
};

export default Tip;
