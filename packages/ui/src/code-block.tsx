"use client";

import { useRef, useState } from "react";

import { cn } from "@tech-tutor/utils/cn";
import type { DocCodeBlock } from "@tech-tutor/types";

/**
 * Renders a code block with a header (language + optional filename), a
 * copy-to-clipboard button, and a dark well. The code is rendered verbatim
 * (no syntax highlighting) in a horizontally scrollable region.
 */
export function CodeBlock({
  block,
  className,
}: {
  block: DocCodeBlock;
  className?: string;
}) {
  const { title, lang, code } = block;
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  async function copy() {
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
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <figure
      className={cn(
        "group/code my-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/20",
        className,
      )}
    >
      <figcaption className="flex h-9 items-center justify-between gap-3 border-b border-zinc-800/80 bg-zinc-900/60 px-3.5 text-[13px] font-medium text-zinc-300">
        <span className="flex min-w-0 items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </span>
          {title ? (
            <span className="truncate text-zinc-400">
              <span className="mr-1.5 text-zinc-500">#</span>
              {title}
            </span>
          ) : null}
        </span>
        <span className="flex items-center gap-3">
          {lang ? (
            <span className="uppercase tracking-wide text-zinc-500">{lang}</span>
          ) : null}
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/70 px-2 text-[12px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            {copied ? (
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 text-emerald-400"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M12.7 4.7a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L4.3 8.1a1 1 0 1 1 1.4-1.4l1.3 1.3 3.8-3.8a1 1 0 0 1 1.4 0Z"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                aria-hidden
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  d="M5 4.5h7.5A1.5 1.5 0 0 1 14 6v6.5a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 12.5V5.5"
                />
                <rect
                  x="2"
                  y="1.5"
                  width="9"
                  height="9"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            )}
            <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
          </button>
        </span>
      </figcaption>
      <pre
        className="overflow-x-auto p-4 text-[13.5px] leading-6 text-zinc-100"
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}
