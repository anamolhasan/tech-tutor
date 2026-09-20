import Link from "next/link";

import {
  BASE_URL,
  docTopicHref,
  getFirstDocTopic,
  getTechnologiesByCategory,
  type Technology,
} from "@tech-tutor/config/server";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="size-3.5"
    aria-hidden="true"
  >
    <path
      d="M7 4l5 6-5 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="size-3.5"
    aria-hidden="true"
  >
    <path
      d="M10 2.5l1.2 4.8L16 8.5l-4.8 1.2L10 14.5l-1.2-4.8L4 8.5l4.8-1.2L10 2.5Z"
      fill="currentColor"
    />
    <path
      d="M16 13.5l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2Z"
      fill="currentColor"
    />
  </svg>
);

const QuickStartCard = ({ tech }: { tech: Technology }) => {
  const Icon = tech.icon;
  const first = getFirstDocTopic(tech.slug);

  const href = first
    ? docTopicHref(tech.slug, first.slug)
    : `${BASE_URL}/${tech.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex min-h-19 items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Hover glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Icon */}
      <span
        className={`relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br text-white shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:ring-white/10 ${tech.gradient}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-white/25 via-transparent to-black/10"
        />

        <Icon className="relative z-10 size-4.5 text-white drop-shadow-sm" />
      </span>

      {/* Content */}
      <span className="relative min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold leading-5 text-foreground transition-colors duration-200 group-hover:text-primary">
          {tech.name}
        </span>

        <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-muted-foreground">
          Learn & Explore
        </span>
      </span>

      {/* Arrow */}
      <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
        <ArrowIcon />
      </span>
    </Link>
  );
};

const QuickStart = () => {
  const categories = getTechnologiesByCategory();

  return (
    <section
      id="quick-start"
      className="relative mx-auto w-full max-w-400 px-4 pb-20 sm:px-6"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-105 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Header */}
      <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            <SparkIcon />
            <span>Start Learning</span>
          </div>

          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Quick Start
          </h2>

          <p className="mt-2.5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
            দ্রুত শুরু করুন — আপনার পছন্দের technology বেছে নিয়ে
            documentation শেখা শুরু করুন।
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur-sm sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>Learn at your own pace</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((category) => (
          <div key={category.slug}>
            {/* Category title */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />

                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                  {category.label}
                </h3>
              </div>

              <span className="h-px flex-1 bg-linear-to-r from-border/80 to-transparent" />

              <span className="shrink-0 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                {category.technologies.length}{" "}
                {category.technologies.length === 1 ? "topic" : "topics"}
              </span>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {category.technologies.map((tech: Technology) => (
                <QuickStartCard key={tech.slug} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="mt-12 flex items-center justify-center">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-border to-transparent" />

        <span className="mx-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
          Keep Learning
        </span>

        <div className="h-px w-24 bg-linear-to-r from-border via-transparent to-transparent" />
      </div>
    </section>
  );
};

export default QuickStart;