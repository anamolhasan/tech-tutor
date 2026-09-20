import { loadAllTopics, type LoadedTopic } from "@tech-tutor/utils/content";
import { slugifyHeading } from "@tech-tutor/utils/inline";

import { BASE_URL, getTechnology } from "./technologies";

let topicCache: LoadedTopic[] | null = null;

/** All migrated lesson files (content/<tech>/<topic>.mdx), in topic order. */
export function getAllTopics(): LoadedTopic[] {
  if (!topicCache) topicCache = loadAllTopics();
  return topicCache;
}

/** Topics for a single technology, in sidebar order. */
export function getTechTopics(techSlug: string): LoadedTopic[] {
  return getAllTopics().filter((topic) => topic.techSlug === techSlug);
}

/** First topic for a technology (used for overview redirects). */
export function getFirstDocTopic(
  techSlug: string,
): LoadedTopic | undefined {
  return getTechTopics(techSlug)[0];
}

/** A single lesson topic by technology + slug. */
export function getDocTopic(
  techSlug: string,
  topicSlug: string,
): LoadedTopic | undefined {
  return getTechTopics(techSlug).find((topic) => topic.slug === topicSlug);
}

export const docTopicHref = (techSlug: string, topicSlug: string): string =>
  `${BASE_URL}/${techSlug}/${topicSlug}`;

/** Previous / next topic within a technology, in sidebar order. */
export function getDocPrevNext(
  techSlug: string,
  topicSlug: string,
): { prev?: { slug: string; title: string }; next?: { slug: string; title: string } } {
  const topics = getTechTopics(techSlug);
  const index = topics.findIndex((topic) => topic.slug === topicSlug);
  if (index === -1) return {};
  return {
    prev: topics[index - 1]
      ? { slug: topics[index - 1].slug, title: topics[index - 1].frontmatter.title }
      : undefined,
    next: topics[index + 1]
      ? { slug: topics[index + 1].slug, title: topics[index + 1].frontmatter.title }
      : undefined,
  };
}

export type ResolvedDocTopic = {
  techSlug: string;
  techName: string;
  techColor: string;
  topic: { title: string; label: string; level?: string };
  href: string;
};

export function getAllDocTopics(): ResolvedDocTopic[] {
  return getAllTopics().map((topic) => {
    const tech = getTechnology(topic.techSlug);
    return {
      techSlug: topic.techSlug,
      techName: tech?.name ?? topic.techSlug,
      techColor: tech?.color ?? "",
      topic: {
        title: topic.frontmatter.title,
        label: topic.frontmatter.label,
        level: topic.frontmatter.level,
      },
      href: docTopicHref(topic.techSlug, topic.slug),
    };
  });
}

export type SearchIndexTopic = {
  techSlug: string;
  slug: string;
  label: string;
  title: string;
  techName: string;
  techColor: string;
  href: string;
  level?: string;
};

/** Serialisable flat index shipped to client components (search / sidebar). */
export function getSearchIndex(): SearchIndexTopic[] {
  return getAllDocTopics().map((topic) => ({
    techSlug: topic.techSlug,
    slug: topic.href.split("/").pop() ?? "",
    label: topic.topic.label,
    title: topic.topic.title,
    techName: topic.techName,
    techColor: topic.techColor,
    href: topic.href,
    level: topic.topic.level,
  }));
}

export type DocHeading = { id: string; text: string; level: 2 | 3 };

/**
 * Heading ids for the on-this-page navigation, parsed from the raw MDX
 * body. Indexes mirror the ids assigned by the h2/h3 MDX renderers (which
 * use the same `slugifyHeading` on the unescaped heading text).
 */
export function getTopicHeadings(mdx: string): DocHeading[] {
  const headings: DocHeading[] = [];
  const pattern = /^(#{2,3}) +(.*)$/gm;
  for (const match of mdx.matchAll(pattern)) {
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    headings.push({ id: slugifyHeading(text), text, level });
  }
  return headings;
}

/**
 * Approximates the original `topic.blocks.length` count: each migrated
 * block (paragraph / heading / list / code / tip / table) is separated by a
 * blank line in the MDX body.
 */
export function countDocumentParts(mdx: string): number {
  return mdx.split(/\n\s*\n+/).filter((part) => part.trim().length > 0).length;
}