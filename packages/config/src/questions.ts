import {
  loadAllQuestions,
  loadQuestionCategories,
  type LoadedQuestion,
  type LoadedQuestionCategory,
} from "@tech-tutor/utils/questions";

import { BASE_URL } from "./technologies";

let categoryCache: LoadedQuestionCategory[] | null = null;
let questionCache: LoadedQuestion[] | null = null;

/** All Q&A categories across every technology, in category order. */
export function getAllQuestionCategories(): LoadedQuestionCategory[] {
  if (!categoryCache) categoryCache = loadQuestionCategories();
  return categoryCache;
}

/** All Q&A questions across every technology, in category/order order. */
export function getAllQuestions(): LoadedQuestion[] {
  if (!questionCache) questionCache = loadAllQuestions();
  return questionCache;
}

export const questionsHref = (techSlug: string): string =>
  `${BASE_URL}/${techSlug}/questions`;

export const questionCategoryHref = (
  techSlug: string,
  categorySlug: string,
): string => `${BASE_URL}/${techSlug}/questions/${categorySlug}`;

export const questionHref = (
  techSlug: string,
  categorySlug: string,
  questionSlug: string,
): string => `${BASE_URL}/${techSlug}/questions/${categorySlug}/${questionSlug}`;

/** Technologies that currently ship Q&A content. */
export function getQuestionTechnologies(): string[] {
  return [...new Set(getAllQuestionCategories().map((cat) => cat.techSlug))];
}

/** Q&A categories for a single technology, in sidebar order. */
export function getTechQuestionCategories(
  techSlug: string,
): LoadedQuestionCategory[] {
  return getAllQuestionCategories().filter((cat) => cat.techSlug === techSlug);
}

/** A single Q&A category by technology + slug. */
export function getQuestionCategory(
  techSlug: string,
  categorySlug: string,
): LoadedQuestionCategory | undefined {
  return getTechQuestionCategories(techSlug).find(
    (cat) => cat.slug === categorySlug,
  );
}

/** Whether a technology has any Q&A categories. */
export function hasQuestions(techSlug: string): boolean {
  return getTechQuestionCategories(techSlug).length > 0;
}

/** Questions in one category, in authoring order. */
export function getCategoryQuestions(
  techSlug: string,
  categorySlug: string,
): LoadedQuestion[] {
  return getAllQuestions().filter(
    (question) =>
      question.techSlug === techSlug &&
      question.categorySlug === categorySlug,
  );
}

/** A single question by technology + category + slug. */
export function getQuestion(
  techSlug: string,
  categorySlug: string,
  questionSlug: string,
): LoadedQuestion | undefined {
  return getAllQuestions().find(
    (question) =>
      question.techSlug === techSlug &&
      question.categorySlug === categorySlug &&
      question.slug === questionSlug,
  );
}

export type QuestionCategoryListItem = {
  techSlug: string;
  slug: string;
  name: string;
  description?: string;
  count: number;
  href: string;
};

/** Categories with question counts, used by the `/questions` root page. */
export function getQuestionCategoryList(
  techSlug: string,
): QuestionCategoryListItem[] {
  return getTechQuestionCategories(techSlug).map((category) => ({
    techSlug: category.techSlug,
    slug: category.slug,
    name: category.frontmatter.name,
    description: category.frontmatter.description,
    count: getCategoryQuestions(techSlug, category.slug).length,
    href: questionCategoryHref(techSlug, category.slug),
  }));
}

export type QuestionCategoryIndex = {
  techSlug: string;
  slug: string;
  name: string;
  href: string;
};

/**
 * Serialisable flat index shipped to client components (sidebar), mirroring
 * the topic index in `docs.ts`.
 */
export function getQuestionCategoryIndex(): QuestionCategoryIndex[] {
  return getAllQuestionCategories().map((category) => ({
    techSlug: category.techSlug,
    slug: category.slug,
    name: category.frontmatter.name,
    href: questionCategoryHref(category.techSlug, category.slug),
  }));
}