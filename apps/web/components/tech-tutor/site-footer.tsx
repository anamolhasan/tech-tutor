import Link from "next/link";

import { BASE_URL } from "@tech-tutor/config/server";
import TechnologyList from "./technology-list";

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-card/40">
        {/* Technology list */}
      <TechnologyList />
      {/* Footer */}
      <div className="mx-auto w-full max-w-400 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-sm">
            <Link href="/tech-tutor" className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Tech Tutor
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              বাংলায় ওয়েব ডেভেলপমেন্ট ডকুমেন্টেশন শিখুন — ধাপে ধাপে।
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/"
              className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href={BASE_URL}
              className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
            >
              সব ডকুমেন্টেশন
            </Link>
            <Link
              href="#quick-start"
              className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
            >
              Quick Start
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border/70 pt-5 text-[12px] text-muted-foreground">
          © {currentYear} Tech Tutor. বাংলায় শিখুন, বাংলায় গড়ুন।
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;