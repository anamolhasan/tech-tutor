import Link from "next/link";

import { BASE_URL, technologies } from "@tech-tutor/config";
import { cn } from "@/lib/utils";

interface TechnologyLinksProps {
  currentPath: string;
  className?: string;
  onNavigate?: () => void;
}

/**
 * The list of technology links shared between the sticky desktop
 * navigation bar and the mobile drawer.
 */
export const TechnologyLinks = ({
  currentPath,
  className,
  onNavigate,
}: TechnologyLinksProps) => {
  const isActive = (slug: string) =>
    currentPath === `${BASE_URL}/${slug}` ||
    currentPath.startsWith(`${BASE_URL}/${slug}/`);

  const isHome = currentPath === BASE_URL;

  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <Link
        href={BASE_URL}
        onClick={onNavigate}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors",
          isHome
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        Docs
      </Link>

      <span className="mx-1 h-4 w-px shrink-0 bg-border" />

      {technologies.map((tech) => {
        const active = isActive(tech.slug);

        return (
          <Link
            key={tech.slug}
            href={`${BASE_URL}/${tech.slug}`}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors",
              active
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <tech.icon className={cn("size-3.5", !active && tech.color)} />
            {tech.name}
          </Link>
        );
      })}
    </div>
  );
};