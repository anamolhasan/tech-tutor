import type { Metadata } from "next";

import DocNavbar from "@/components/doc-navbar";
import MobileDocDrawer from "@/components/mobile-doc-drawer";
import SiteFooter from "@/components/tech-tutor/site-footer";
import { DocNavProvider } from "@/components/doc-nav-context";
import { DocDataProvider } from "@/components/doc-data-context";
import TechnologyNavigation from "@/components/technology-navigation";
import { getQuestionCategoryIndex, getSearchIndex } from "@tech-tutor/config/server";

export const metadata: Metadata = {
  title: "Tech Tutor",
  description:
    "বাংলা ওয়েব ডেভেলপমেন্ট ডকুমেন্টেশন — HTML, CSS ও JavaScript ধাপে ধাপে শিখুন।",
};

const TechTutorLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const topics = getSearchIndex();
  const questionCategories = getQuestionCategoryIndex();

  return (
    <DocNavProvider>
      <DocDataProvider topics={topics} questionCategories={questionCategories}>
        <div className="min-h-dvh bg-background">
          <DocNavbar />
          <TechnologyNavigation />
          <main className="min-w-0 flex-1">{children}</main>
          <SiteFooter />
          <MobileDocDrawer />
        </div>
      </DocDataProvider>
    </DocNavProvider>
  );
};

export default TechTutorLayout;