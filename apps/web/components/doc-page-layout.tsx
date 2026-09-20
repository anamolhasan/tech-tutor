"use client";

import { ListTree } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTechnology } from "@tech-tutor/config";
import DocSidebar from "./doc-sidebar";
import DocToc from "./doc-toc";
import { useDocNav } from "./doc-nav-context";

interface DocPageLayoutProps {
  techSlug: string;
  tocItems: { id: string; text: string; level: 2 | 3 }[];
  children: React.ReactNode;
}

/**
 * Three-column documentation shell:
 *
 *   [left topic sidebar]  [main documentation]  [on-this-page toc]
 *
 * The side columns are sticky and scroll independently on desktop. On
 * smaller screens both collapse into the mobile drawer.
 */
const DocPageLayout = ({
  techSlug,
  tocItems,
  children,
}: DocPageLayoutProps) => {
  const { setSidebarOpen } = useDocNav();
  const tech = getTechnology(techSlug);

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
      <div className="flex items-start gap-8 xl:gap-10">
        {/* Left sidebar */}
        <aside className="sticky top-[6.8rem] hidden max-h-[calc(100dvh-7.6rem)] w-60 shrink-0 self-start overflow-y-auto pb-10 pt-8 lg:block xl:w-64">
          <DocSidebar techSlug={techSlug} />
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1 py-8">
          <Button
            variant="outline"
            size="sm"
            className="mb-6 w-full justify-between rounded-lg lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="flex items-center gap-2">
              <ListTree className="size-4" />
              টপিক ব্রাউজ করুন
            </span>
            <span className="flex items-center gap-1.5 text-xs font-normal text-muted-foreground">
              {tech?.name}
            </span>
          </Button>

          <article className="mx-auto w-full max-w-3xl">{children}</article>
        </div>

        {/* Right TOC */}
        {tocItems.length > 0 && (
          <aside className="sticky top-[6.8rem] hidden max-h-[calc(100dvh-7.6rem)] w-60 shrink-0 self-start overflow-y-auto pb-10 pt-8 xl:block">
            <DocToc items={tocItems} />
          </aside>
        )}
      </div>
    </div>
  );
};

export default DocPageLayout;