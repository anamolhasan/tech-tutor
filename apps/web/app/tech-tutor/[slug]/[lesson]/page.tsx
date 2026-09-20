import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DocPageLayout from "@/components/doc-page-layout";
import { DocContent } from "@/components/doc-content";
import { BASE_URL, getTechnology } from "@tech-tutor/config/server";
import {
  getAllTopics,
  getDocPrevNext,
  getDocTopic,
  getTopicHeadings,
  countDocumentParts,
  docTopicHref,
} from "@tech-tutor/config/server";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTopics().map((topic) => ({
    slug: topic.techSlug,
    lesson: topic.slug,
  }));
}

type TechTutorLessonPageProps = {
  params: Promise<{ slug: string; lesson: string }>;
};

export async function generateMetadata({
  params,
}: TechTutorLessonPageProps): Promise<Metadata> {
  const { slug, lesson } = await params;
  const topic = getDocTopic(slug, lesson);
  const tech = getTechnology(slug);

  return {
    title: topic ? `${topic.frontmatter.title} — ${tech?.name ?? ""}` : "Tech Tutor",
    description: topic?.frontmatter.description,
  };
}

const levelStyles: Record<string, string> = {
  Beginner: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Intermediate:
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Advanced: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

const TechTutorLessonPage = async ({
  params,
}: TechTutorLessonPageProps) => {
  const { slug, lesson } = await params;
  const tech = getTechnology(slug);
  const topic = getDocTopic(slug, lesson);

  if (!tech || !topic) notFound();

  const Icon = tech.icon;
  const headings = getTopicHeadings(topic.mdx);
  const parts = countDocumentParts(topic.mdx);
  const { prev, next } = getDocPrevNext(slug, lesson);
  const overviewHref = `${BASE_URL}/${slug}`;

  return (
    <DocPageLayout techSlug={slug} tocItems={headings}>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-5">
        <BreadcrumbList className="flex-wrap">
          <BreadcrumbItem>
            <BreadcrumbLink href={BASE_URL}>Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={overviewHref}>{tech.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{topic.frontmatter.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Content header */}
      <header className="mb-8 border-b border-border/80 pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex size-6 items-center justify-center rounded-md bg-linear-to-br text-white",
              tech.gradient,
            )}
          >
            <Icon className="size-3" />
          </span>
          <Badge variant="outline" className="rounded-full">
            {tech.name}
          </Badge>
          {topic.frontmatter.level && (
            <Badge
              className={cn(
                "rounded-full",
                levelStyles[topic.frontmatter.level],
              )}
            >
              {topic.frontmatter.level}
            </Badge>
          )}
        </div>

        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
          {topic.frontmatter.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {topic.frontmatter.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            {parts}টি অংশ
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            বাংলা ভাষায়
          </span>
        </div>
      </header>

      {/* Documentation body */}
      <DocContent mdx={topic.mdx} />

      {/* Prev / next */}
      <nav className="mt-12 flex flex-col gap-3 border-t border-border/80 pt-6 sm:flex-row">
        {prev ? (
          <Link
            href={docTopicHref(slug, prev.slug)}
            className="group flex min-w-0 flex-1 flex-col gap-1 rounded-xl border border-border/80 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground uppercase">
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
              আগের
            </span>
            <span className="truncate text-[13px] font-medium text-foreground">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}

        {next ? (
          <Link
            href={docTopicHref(slug, next.slug)}
            className="group flex min-w-0 flex-1 flex-col items-end gap-1 rounded-xl border border-border/80 px-4 py-3 text-right transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground uppercase">
              পরের
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="truncate text-[13px] font-medium text-foreground">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href={overviewHref}
            className="flex min-w-0 flex-1 items-center justify-end gap-1.5 rounded-xl border border-border/80 px-4 py-3 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            {tech.name} ডকুমেন্টেশন হোম
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </nav>
    </DocPageLayout>
  );
};

export default TechTutorLessonPage;