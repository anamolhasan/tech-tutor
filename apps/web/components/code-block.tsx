"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}

const CodeBlock = ({ code, lang, title, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "group/code overflow-hidden rounded-xl border border-border/80 bg-[oklch(0.16_0.02_160)] text-[oklch(0.96_0.008_110)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] py-2 pr-2 pl-4">
        <div className="flex items-center gap-2 overflow-hidden">
          {title ? (
            <span className="truncate font-mono text-xs text-white/70">
              {title}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[oklch(0.577_0.245_27.325)]" />
              <span className="size-2 rounded-full bg-[oklch(0.85_0.2_130)]" />
              <span className="size-2 rounded-full bg-[oklch(0.6_0.14_162)]" />
            </span>
          )}
          {title && lang && (
            <span className="hidden rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-white/60 uppercase sm:inline-flex">
              {lang}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {title && (
            <span className="hidden font-mono text-[10px] tracking-wide text-white/60 uppercase sm:inline-flex">
              {lang}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copy}
            aria-label="কোড কপি করুন"
            className="text-white/60 hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </Button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed [scrollbar-width:thin]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;