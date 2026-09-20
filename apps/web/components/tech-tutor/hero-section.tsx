import { BookOpenText, GraduationCap, Layers, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import HeroSearch from "@/components/hero-search";
import {
  getAllDocTopics,
  getOverallProgress,
  getTotalLessonsCompleted,
  technologies,
} from "@tech-tutor/config/server";

const HeroSection = () => {
  const stats = [
    {
      icon: BookOpenText,
      label: "প্রযুক্তি",
      value: technologies.length,
    },
    {
      icon: Layers,
      label: "টপিক",
      value: getAllDocTopics().length,
    },
    {
      icon: GraduationCap,
      label: "Lesson সম্পন্ন",
      value: getTotalLessonsCompleted(),
    },
    {
      icon: TrendingUp,
      label: "সামগ্রিক অগ্রগতি",
      value: `${getOverallProgress()}%`,
    },
  ];

  return (
    <section className="border-b border-border/70">
      <div className="mx-auto w-full max-w-400 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/10 text-primary"
          >
            বাংলায় শিখুন আধুনিক Web Development
          </Badge>

          <h1 className="mt-6 font-heading text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
            Web Development শিখুন <span className="text-primary">বাংলায়</span>
            , ধাপে ধাপে
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            HTML থেকে Next.js পর্যন্ত জনপ্রিয় সব প্রযুক্তির সহজ ডকুমেন্টেশন।
            প্রতিটি টপিক ধাপে ধাপে সাজানো — উদাহরণ, কোড এবং বাংলা ব্যাখ্যা সহ।
          </p>

          <div className="mt-9 flex justify-center">
            <HeroSearch />
          </div>

          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="size-4" />
                </span>
                <dt className="order-last text-[12px] text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;