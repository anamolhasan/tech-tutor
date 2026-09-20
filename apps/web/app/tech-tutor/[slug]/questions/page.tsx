import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleHelp } from "lucide-react";

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
import {
  BASE_URL,
  getTechnology,
} from "@tech-tutor/config/server";
import {
  getQuestionCategoryList,
  getQuestionTechnologies,
} from "@tech-tutor/config/server";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getQuestionTechnologies().map((slug) => ({ slug }));
}

type QuestionsIndexPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: QuestionsIndexPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnology(slug);
  const categories = getQuestionCategoryList(slug);
  if (!tech || categories.length === 0) return { title: "Tech Tutor" };
  return {
    title: `${tech.name} প্রশ্ন/উত্তর`,
    description: `${tech.name} নিয়ে ঘন ঘন জিজ্ঞাসিত প্রশ্নগুলো — সহজ বাংলায় উত্তরসহ।`,
  };
}

const QuestionsIndexPage = async ({ params }: QuestionsIndexPageProps) => {
  const { slug } = await params;
  const tech = getTechnology(slug);
  const categories = getQuestionCategoryList(slug);
  if (!tech || categories.length === 0) notFound();

  const Icon = tech.icon;
  const overviewHref = `${BASE_URL}/${slug}`;

  return (
    <DocPageLayout techSlug={slug} tocItems={[]}>
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
            <BreadcrumbPage>প্রশ্ন/উত্তর</BreadcrumbPage>
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
          <Badge variant="outline" className="rounded-full text-primary">
            <CircleHelp className="size-3" />
            প্রশ্ন/উত্তর
          </Badge>
        </div>

        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
          {tech.name} প্রশ্ন/উত্তর
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {tech.name} শেখার সময় সবার মাথায় আসা সাধারণ প্রশ্নগুলোর সহজ
          উত্তর। বিভাগ বেছে নিয়ে পড়া শুরু করুন।
        </p>
      </header>

      {/* Categories */}
      <div className="flex flex-col gap-2.5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={category.href}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border/80 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CircleHelp className="size-4" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-[13px] font-medium text-foreground">
                  {category.name}
                </span>
                <span className="truncate text-[11px] text-muted-foreground">
                  {category.count}টি প্রশ্ন
                </span>
              </span>
            </span>
            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </DocPageLayout>
  );
};

export default QuestionsIndexPage;