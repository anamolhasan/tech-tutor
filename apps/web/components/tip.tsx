import { CircleCheck, Info, TriangleAlert } from "lucide-react";

import { InlineParagraph } from "./inline";
import { cn } from "@/lib/utils";

const tipIcon = {
  info: Info,
  warning: TriangleAlert,
  success: CircleCheck,
} as const;

const tipContainerClass = {
  info: "border-sky-500/40 bg-sky-500/5",
  warning: "border-amber-500/40 bg-amber-500/5",
  success: "border-emerald-500/40 bg-emerald-500/5",
} as const;

const tipIconClass = {
  info: "text-sky-600 dark:text-sky-400",
  warning: "text-amber-600 dark:text-amber-400",
  success: "text-emerald-600 dark:text-emerald-400",
} as const;

interface TipProps {
  tone?: keyof typeof tipContainerClass;
  title?: string;
  text: string;
  className?: string;
}

/** Renders a migrated `<Tip tone title text />` block. */
export function Tip({ tone = "info", title, text, className }: TipProps) {
  const Icon = tipIcon[tone];
  return (
    <div className={cn("rounded-xl border p-4", tipContainerClass[tone], className)}>
      <div className="mb-1 flex items-center gap-2">
        <Icon className={cn("size-4 shrink-0", tipIconClass[tone])} />
        <span className="text-[12px] font-semibold tracking-wide text-foreground uppercase">
          {title ?? (tone === "warning" ? "সতর্কতা" : "পরামর্শ")}
        </span>
      </div>
      <InlineParagraph text={text} className="text-sm" />
    </div>
  );
}

export default Tip;