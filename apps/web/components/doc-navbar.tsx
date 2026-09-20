"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu, Search, UserRoundPenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@tech-tutor/config";
import DocSearch from "./doc-search";
import ThemeToggle from "./theme-toggle";
import { useDocNav } from "./doc-nav-context";

const GitHubUrl = "https://github.com/anamolhasan/anamol_hasan";
const portfolioUrl = "https://anamolhasan.vercel.app"

const DocNavbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { setSidebarOpen } = useDocNav();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-400 items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand */}
        <Link
          href={BASE_URL}
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-primary to-lime-600 text-white">
            <GraduationCap className="size-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[15px] font-semibold tracking-tight">
              Tech Tutor
            </span>
            <span className="hidden text-[10px] text-muted-foreground sm:block">
              Bangla Web Documentation
            </span>
          </span>
        </Link>

        {/* Search */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="group mx-auto flex h-8 w-full max-w-md items-center gap-2.5 rounded-lg border border-border/80 bg-muted/40 px-3 text-left text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/70"
        >
          <Search className="size-3.5 shrink-0" />
          <span className="truncate">ডকুমেন্টেশন সার্চ করুন...</span>
          <kbd className="ml-auto hidden shrink-0 items-center gap-0.5 rounded-md border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            Ctrl <span className="text-[9px]">K</span>
          </kbd>
        </button>

        {/* Actions */}
     <div className="flex shrink-0 items-center gap-1.5">
  <ThemeToggle />

  <Button
    variant="ghost"
    size="icon-sm"
    asChild
    className="hidden text-muted-foreground sm:inline-flex"
    aria-label="GitHub repository"
    title="GitHub repository"
  >
    <a href={GitHubUrl} target="_blank" rel="noopener noreferrer">
      <svg
        viewBox="0 0 16 16"
        className="size-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    </a>
  </Button>

  <Button
    variant="ghost"
    size="sm"
    asChild
    className="hidden gap-1.5 text-muted-foreground sm:inline-flex"
    aria-label="Portfolio"
    title="My Portfolio"
  >
    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
      <UserRoundPenIcon className="size-4" />
      <span>Portfolio</span>
    </a>
  </Button>

  <Button
    variant="outline"
    size="icon-sm"
    className="lg:hidden"
    aria-label="মেনু খুলুন"
    onClick={() => setSidebarOpen(true)}
  >
    <Menu className="size-4" />
  </Button>
</div>
      </div>

      <DocSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default DocNavbar;
