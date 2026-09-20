import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

import {
  BASE_URL,
  docTopicHref,
  getFirstDocTopic,
} from "@tech-tutor/config/server";

const CtaSection = () => {
  const htmlFirst = getFirstDocTopic("html");

  return (
    <section className="mx-auto w-full max-w-400 px-4 pb-16 sm:px-6">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
        <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Rocket className="size-5" />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-foreground">
          প্রথম ধাপটা নিন
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          যেকোনো ওয়েব ডেভেলপমেন্ট যাত্রার শুরু এই সহজ, বাংলা গাইডগুলো দিয়ে।
          আজই শুরু করুন — প্রতিটি ধাপ আপনার গতির সাথে মানিয়ে নেওয়া যায়।
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={htmlFirst ? docTopicHref("html", htmlFirst.slug) : BASE_URL}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            HTML ডকুমেন্টেশন
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#technologies"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            সব প্রযুক্তি দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;