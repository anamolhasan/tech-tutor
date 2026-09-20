"use client";

import { useEffect, useRef, useState } from "react";
import { ListOrdered } from "lucide-react";

import { cn } from "@/lib/utils";

interface DocTocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface DocTocProps {
  items: DocTocItem[];
}

/**
 * Right-hand "On This Page" navigation. Tracks the scrolled heading with an
 * IntersectionObserver and highlights the current section.
 */
const DocToc = ({ items }: DocTocProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[visible.length - 1].target.id);
        }
      },
      { rootMargin: "-88px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observerRef.current?.observe(heading));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="এই পেজের বিষয়বস্তু" className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-3">
        <ListOrdered className="size-3.5 text-muted-foreground" />
        <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          এই পেজে
        </span>
      </div>
      <ul className="flex flex-col gap-px border-l border-border">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative border-l-2 px-3 py-1 text-left text-[12.5px] leading-relaxed transition-colors",
                  item.level === 3 ? "pl-6" : "",
                  active
                    ? "-ml-px border-primary font-medium text-foreground"
                    : "ml-px border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DocToc;