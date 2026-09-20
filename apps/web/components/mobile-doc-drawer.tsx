"use client";

import { usePathname } from "next/navigation";
import { ListTree } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BASE_URL } from "@tech-tutor/config";
import DocSidebar from "./doc-sidebar";
import { TechnologyLinks } from "./technology-links";
import { useDocNav } from "./doc-nav-context";

/**
 * Mobile navigation drawer: technology switcher + the current technology's
 * topic sidebar. Opened from the navbar hamburger button.
 */
const MobileDocDrawer = () => {
  const { sidebarOpen, setSidebarOpen } = useDocNav();
  const pathname = usePathname();

  const techSlug = pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length + 1).split("/")[0]
    : undefined;

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-[85%] gap-0 p-0 sm:max-w-sm">
        <div className="flex flex-col">
          <SheetHeader className="border-b border-border/70 p-4 pb-3">
            <SheetTitle className="flex items-center gap-2">
              <ListTree className="size-4 text-primary" />
              টিউটোরিয়াল
            </SheetTitle>
          </SheetHeader>

          <div className="border-b border-border/70 px-2 py-3">
            <TechnologyLinks
              currentPath={pathname}
              onNavigate={() => setSidebarOpen(false)}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {techSlug ? (
              <DocSidebar
                techSlug={techSlug}
                onNavigate={() => setSidebarOpen(false)}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-sm text-muted-foreground">
                <p>যখন একটি বিষয় খুলবেন তখন সাইডবার এখানে দেখা যাবে।</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileDocDrawer;