"use client";

import { usePathname } from "next/navigation";

import { TechnologyLinks } from "./technology-links";

/**
 * Second navigation level: switches the documentation context between
 * technologies. The active technology (matching the current route) is
 * visually highlighted; clicking it changes the whole sidebar + content.
 */
const TechnologyNavigation = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="প্রযুক্তি নেভিগেশন"
      className="sticky top-14 z-30 border-b border-border/70 bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-400 items-center px-4 py-2 sm:px-6">
        <TechnologyLinks currentPath={pathname} />
      </div>
    </nav>
  );
};

export default TechnologyNavigation;