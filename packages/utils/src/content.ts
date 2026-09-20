import path from "node:path";
import { readdirSync, readFileSync, existsSync } from "node:fs";

import matter from "gray-matter";
import type { Technology, TechDocs, DocTopic, DocTopicFrontmatter } from
  "@tech-tutor/types";

/** All lesson files live under `<repo-root>/content/<tech>/<topic>.mdx`. */
export function resolveContentDir(): string {
  const candidate = path.resolve(process.cwd(), "..", "..", "content");
  if (existsSync(candidate)) return candidate;
  // Fall back to a content dir directly inside the current workspace.
  if (existsSync(path.resolve(process.cwd(), "content"))) {
    return path.resolve(process.cwd(), "content");
  }
  throw new Error(`Could not locate the content/ directory (tried: ${candidate})`);
}

export type LoadedTopic = {
  techSlug: string;
  slug: string;
  frontmatter: DocTopicFrontmatter;
  /** Raw MDX body (rendered client-side with the docs components). */
  mdx: string;
};

/**
 * Returns all `<tech>/<topic>.mdx` lesson files ordered by
 * frontmatter `order`, grouped by technology.
 */
export function loadAllTopics(contentDir: string = resolveContentDir()): LoadedTopic[] {
  const out: LoadedTopic[] = [];
  for (const techSlug of readdirSync(contentDir, { withFileTypes: true })) {
    if (!techSlug.isDirectory()) continue;
    const dir = path.join(contentDir, techSlug.name);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = matter(readFileSync(path.join(dir, file), "utf8"));
      out.push({
        techSlug: techSlug.name,
        slug,
        frontmatter: data as unknown as DocTopicFrontmatter,
        mdx: content,
      });
    }
  }
  return out.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/** Topic slugs in sidebar order for a technology (metadata only). */
export function listTopicSlugs(
  techSlug: string,
  topics: LoadedTopic[] = loadAllTopics(),
): { slug: string; label: string; order: number; level?: string }[] {
  return topics
    .filter((t) => t.techSlug === techSlug)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
    .map((t) => ({
      slug: t.slug,
      label: t.frontmatter.label,
      order: t.frontmatter.order,
      level: t.frontmatter.level,
    }));
}

/** First topic slug for a technology (used for overview redirects). */
export function firstTopicSlug(
  techSlug: string,
  topics: LoadedTopic[] = loadAllTopics(),
): string | undefined {
  return topics
    .filter((t) => t.techSlug === techSlug)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)[0]?.slug;
}

export type { Technology, TechDocs, DocTopic };
