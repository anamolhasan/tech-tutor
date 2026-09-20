"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, CircleHelp } from "lucide-react";

import { BASE_URL, getTechnology } from "@tech-tutor/config";
import { cn } from "@/lib/utils";
import { useDocData } from "./doc-data-context";

interface DocSidebarProps {
  techSlug: string;
  onNavigate?: () => void;
}

/**
 * Left documentation sidebar. Sticky on desktop (see layout) and reused
 * inside the mobile drawer. The current topic/category is highlighted;
 * the Tutorial and Q&A sections have completely independent collapse
 * states. Q&A shows categories only (never individual questions).
 */
const DocSidebar = ({ techSlug, onNavigate }: DocSidebarProps) => {
  const pathname = usePathname();
  const tech = getTechnology(techSlug);
  const { topics, questionCategories } = useDocData();
  const techTopics = topics.filter((topic) => topic.techSlug === techSlug);
  const techCategories = questionCategories.filter(
    (category) => category.techSlug === techSlug,
  );
  const [tutorialCollapsed, setTutorialCollapsed] = useState(false);
  const [questionsCollapsed, setQuestionsCollapsed] = useState(false);

  if (!tech || techTopics.length === 0) return null;

  const overviewHref = `${BASE_URL}/${techSlug}`;
  const isOverviewActive = pathname === overviewHref;

  return (
    <div className="flex h-full flex-col">
      {/* Tech overview link */}
      <Link
        href={techTopics[0].href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2.5 rounded-lg border p-2.5 transition-colors",
          isOverviewActive
            ? "border-primary/30 bg-primary/10"
            : "border-border/80 hover:bg-muted/60",
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md bg-linear-to-br text-white",
            tech.gradient,
          )}
        >
          <tech.icon className="size-4" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[13px] font-semibold">
            {tech.name} Documentation
          </span>
          <span className="truncate text-[11px] text-muted-foreground">
            {techTopics.length}টি অধ্যায়
          </span>
        </span>
      </Link>

      {/* Tutorial section */}
      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <button
          type="button"
          onClick={() => setTutorialCollapsed((value) => !value)}
          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:bg-muted/60"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3" />
            টিউটোরিয়াল
          </span>
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200",
              tutorialCollapsed && "-rotate-90",
            )}
          />
        </button>

        {!tutorialCollapsed && (
          <ul className="mt-1 flex flex-col gap-px">
            {techTopics.map((topic) => {
              const active = pathname === topic.href;

              return (
                <li key={topic.slug}>
                  <Link
                    href={topic.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-lg py-1.5 pr-3 pl-3 text-[13px] transition-colors",
                      active
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                    )}
                    <span className="truncate">{topic.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Q&A section (categories only, filtered by techSlug) */}
      {techCategories.length > 0 && (
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <button
            type="button"
            onClick={() => setQuestionsCollapsed((value) => !value)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:bg-muted/60"
          >
            <span className="flex items-center gap-1.5">
              <CircleHelp className="size-3" />
              প্রশ্ন/উত্তর
            </span>
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-200",
                questionsCollapsed && "-rotate-90",
              )}
            />
          </button>

          {!questionsCollapsed && (
            <ul className="mt-1 flex flex-col gap-px">
              {techCategories.map((category) => {
                const active =
                  pathname === category.href ||
                  pathname.startsWith(`${category.href}/`);

                return (
                  <li key={category.slug}>
                    <Link
                      href={category.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-2 rounded-lg py-1.5 pr-3 pl-3 text-[13px] transition-colors",
                        active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                      )}
                      <span className="truncate">{category.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DocSidebar;