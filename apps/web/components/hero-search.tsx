"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import DocSearch from "./doc-search";

/**
 * Home hero search trigger. Reuses the same DocSearch dialog as the
 * navbar so every lookup goes through one consistent experience.
 */
const HeroSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full max-w-xl items-center gap-3 rounded-xl border border-border/80 bg-card px-4 py-3.5 text-left shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm text-muted-foreground">
          ডকুমেন্টেশন সার্চ করুন — প্রযুক্তি বা টপিক
        </span>
        <kbd className="ml-auto hidden shrink-0 items-center gap-0.5 rounded-md border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
          Ctrl <span className="text-[9px]">K</span>
        </kbd>
      </button>

      <DocSearch open={open} onOpenChange={setOpen} />
    </>
  );
};

export default HeroSearch;