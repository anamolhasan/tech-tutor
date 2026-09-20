import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleHelp } from "lucide-react";

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
  getAllQuestionCategories,
  getCategoryQuestions,
  getQuestionCategory,
  getTechnology,
  questionHref,
  questionsHref,
} from "@tech-tutor/config/server";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllQuestionCategories().map((category) => ({
    slug: category.techSlug,
    category: category.slug,
  }));
}

type QuestionCategoryPageProps = {
  params: Promise<{ slug: string; category: string }>;
};

export async function generateMetadata({
  params,
}: QuestionCategoryPageProps): Promise<Metadata> {
  const { slug, category } = await params;
  const tech = getTechnology(slug);
  const categoryData = getQuestionCategory(slug, category);
  if (!tech || !categoryData) return { title: "Tech Tutor" };
  return {
    title: `${categoryData.frontmatter.name} — ${tech.name} প্রশ্ন/উত্তর`,
    description: categoryData.frontmatter.description,
  };
}

const QuestionCategoryPage = async ({
  params,
}: QuestionCategoryPageProps) => {
  const { slug, category: categorySlug } = await params;
  const tech = getTechnology(slug);
  const category = getQuestionCategory(slug, categorySlug);
  const questions = getCategoryQuestions(slug, categorySlug);
  if (!tech || !category || questions.length === 0) notFound();

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
            <BreadcrumbLink href={questionsHref(slug)}>
              প্রশ্ন/উত্তর
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.frontmatter.name}</BreadcrumbPage>
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
          {tech.name} {category.frontmatter.name} — প্রশ্ন/উত্তর
        </h1>
        {category.frontmatter.description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {category.frontmatter.description}
          </p>
        ) : null}
      </header>

      {/* Questions */}
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] text-muted-foreground marker:font-medium marker:text-primary">
        {questions.map((question) => (
          <li key={question.slug} className="leading-7">
            <Link
              href={questionHref(slug, categorySlug, question.slug)}
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {question.frontmatter.question}
            </Link>
          </li>
        ))}
      </ol>
    </DocPageLayout>
  );
};

export default QuestionCategoryPage;