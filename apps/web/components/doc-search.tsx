"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTechnology } from "@tech-tutor/config";
import { cn } from "@/lib/utils";
import { useDocData } from "./doc-data-context";

interface DocSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocSearch = ({ open, onOpenChange }: DocSearchProps) => {
  const router = useRouter();
  const { topics } = useDocData();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics;

    return topics.filter((topic) => {
      const haystack = `${topic.title} ${topic.label} ${topic.techName}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, topics]);

  useEffect(() => {
    const item = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onOpenChangeSafe = (next: boolean) => {
    if (next) {
      setQuery("");
      setActiveIndex(0);
    }
    onOpenChange(next);
  };

  const navigate = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const current = results[activeIndex];
      if (current) navigate(current.href);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeSafe}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>ডকুমেন্টেশন সার্চ</DialogTitle>
          <DialogDescription>
            প্রযুক্তি টিউটোরিয়াল খুঁজুন
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 border-b border-border/70 px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="ডকুমেন্টেশন সার্চ করুন..."
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="ডকুমেন্টেশন সার্চ"
          />
          <kbd className="hidden rounded-md border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[min(60dvh,26rem)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
              <FileText className="size-6 text-muted-foreground/50" />
              <p className="text-sm font-medium">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs text-muted-foreground">
                &ldquo;{query}&rdquo; — অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন
              </p>
            </div>
          ) : (
            <ul ref={listRef} className="flex flex-col gap-0.5">
              {results.map((result, index) => {
                const tech = getTechnology(result.techSlug);
                const Icon = tech?.icon ?? FileText;
                const active = index === activeIndex;

                return (
                  <li key={result.href}>
                    <button
                      type="button"
                      data-index={index}
                      onClick={() => navigate(result.href)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        active
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60",
                          !active && tech?.color,
                        )}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium">
                          {result.title}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground/80">
                          {result.techName} · {result.label}
                        </span>
                      </span>
                      {active && (
                        <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                          <CornerDownLeft className="size-2.5" />
                          enter
                        </kbd>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-border/70 bg-background px-1 font-mono text-[10px]">
              ↑
            </kbd>
            <kbd className="rounded border border-border/70 bg-background px-1 font-mono text-[10px]">
              ↓
            </kbd>
            নেভিগেট
          </span>
          <span>{results.length}টি ফলাফল</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocSearch;