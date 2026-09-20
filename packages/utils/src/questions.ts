import path from "node:path";
import { readdirSync, readFileSync, existsSync } from "node:fs";

import matter from "gray-matter";
import type {
  Question,
  QuestionCategory,
  QuestionCategoryFrontmatter,
  QuestionFrontmatter,
} from "@tech-tutor/types";

import { resolveContentDir } from "./content";

const CATEGORY_MANIFEST = "index.mdx";

export type LoadedQuestionCategory = {
  techSlug: string;
  slug: string;
  frontmatter: QuestionCategoryFrontmatter;
};

export type LoadedQuestion = {
  techSlug: string;
  categorySlug: string;
  slug: string;
  frontmatter: QuestionFrontmatter;
  /** Raw MDX answer body (rendered with the docs components). */
  mdx: string;
};

/**
 * Q&A lives under `<content>/<tech>/questions/<category>/`.
 *
 * Each category directory contains an `index.mdx` manifest (category name +
 * ordering) plus one MDX file per question. Q&A is kept as a separate content
 * type from the Tutorial `<tech>/<topic>.mdx` files.
 */
function questionsDirFor(contentDir: string, techSlug: string): string {
  return path.join(contentDir, techSlug, "questions");
}

/**
 * All Q&A categories ordered by frontmatter `order`, across every
 * technology that has a `questions/` folder.
 */
export function loadQuestionCategories(
  contentDir: string = resolveContentDir(),
): LoadedQuestionCategory[] {
  const out: LoadedQuestionCategory[] = [];
  for (const tech of readdirSync(contentDir, { withFileTypes: true })) {
    if (!tech.isDirectory()) continue;
    const questionsDir = questionsDirFor(contentDir, tech.name);
    if (!existsSync(questionsDir)) continue;
    for (const category of readdirSync(questionsDir, { withFileTypes: true })) {
      if (!category.isDirectory()) continue;
      const manifest = path.join(questionsDir, category.name, CATEGORY_MANIFEST);
      if (!existsSync(manifest)) continue;
      const { data } = matter(readFileSync(manifest, "utf8"));
      out.push({
        techSlug: tech.name,
        slug: category.name,
        frontmatter: data as unknown as QuestionCategoryFrontmatter,
      });
    }
  }
  return out.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/**
 * All Q&A questions ordered by frontmatter `order`, grouped by category
 * directory. The per-category `index.mdx` manifest is not a question.
 */
export function loadAllQuestions(
  contentDir: string = resolveContentDir(),
): LoadedQuestion[] {
  const out: LoadedQuestion[] = [];
  for (const tech of readdirSync(contentDir, { withFileTypes: true })) {
    if (!tech.isDirectory()) continue;
    const questionsDir = questionsDirFor(contentDir, tech.name);
    if (!existsSync(questionsDir)) continue;
    for (const category of readdirSync(questionsDir, { withFileTypes: true })) {
      if (!category.isDirectory()) continue;
      const categoryDir = path.join(questionsDir, category.name);
      for (const file of readdirSync(categoryDir)) {
        if (!file.endsWith(".mdx") || file === CATEGORY_MANIFEST) continue;
        const slug = file.replace(/\.mdx$/, "");
        const { data, content } = matter(
          readFileSync(path.join(categoryDir, file), "utf8"),
        );
        out.push({
          techSlug: tech.name,
          categorySlug: category.name,
          slug,
          frontmatter: data as unknown as QuestionFrontmatter,
          mdx: content,
        });
      }
    }
  }
  return out.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export type { Question, QuestionCategory };