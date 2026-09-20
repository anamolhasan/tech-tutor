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
import { DocContent } from "@/components/doc-content";
import {
  BASE_URL,
  getAllQuestions,
  getQuestion,
  getQuestionCategory,
  getTechnology,
  getTopicHeadings,
  questionCategoryHref,
  questionsHref,
} from "@tech-tutor/config/server";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllQuestions().map((question) => ({
    slug: question.techSlug,
    category: question.categorySlug,
    question: question.slug,
  }));
}

type QuestionPageProps = {
  params: Promise<{ slug: string; category: string; question: string }>;
};

export async function generateMetadata({
  params,
}: QuestionPageProps): Promise<Metadata> {
  const { slug, category, question } = await params;
  const questionData = getQuestion(slug, category, question);
  const tech = getTechnology(slug);
  return {
    title: questionData
      ? `${questionData.frontmatter.question} — ${tech?.name ?? ""}`
      : "Tech Tutor",
    description: questionData?.frontmatter.description,
  };
}

const QuestionPage = async ({ params }: QuestionPageProps) => {
  const { slug, category: categorySlug, question: questionSlug } = await params;
  const tech = getTechnology(slug);
  const category = getQuestionCategory(slug, categorySlug);
  const question = getQuestion(slug, categorySlug, questionSlug);
  if (!tech || !category || !question) notFound();

  const Icon = tech.icon;
  const overviewHref = `${BASE_URL}/${slug}`;
  const headings = getTopicHeadings(question.mdx);

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
            <BreadcrumbLink href={questionsHref(slug)}>
              প্রশ্ন/উত্তর
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={questionCategoryHref(slug, categorySlug)}>
              {category.frontmatter.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{question.frontmatter.question}</BreadcrumbPage>
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
            {category.frontmatter.name}
          </Badge>
        </div>

        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
          {question.frontmatter.question}
        </h1>
        {question.frontmatter.description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {question.frontmatter.description}
          </p>
        ) : null}
      </header>

      {/* Answer */}
      <DocContent mdx={question.mdx} />

      {/* Back to category */}
      <nav className="mt-12 flex flex-col gap-3 border-t border-border/80 pt-6 sm:flex-row">
        <Link
          href={questionCategoryHref(slug, categorySlug)}
          className="group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-border/80 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/40"
        >
          <span className="min-w-0">
            <span className="block text-[13px] font-medium text-foreground">
              {category.frontmatter.name} বিভাগের আরও প্রশ্ন
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              {tech.name} প্রশ্ন/উত্তর
            </span>
          </span>
          <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </DocPageLayout>
  );
};

export default QuestionPage;