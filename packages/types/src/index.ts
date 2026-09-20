// Shared documentation types used across the Tech Tutor monorepo.

export type DocTone = "info" | "warning" | "success";

export type DocCodeBlock = {
  type: "code";
  /** Optional filename / title shown in the code block header. */
  title?: string;
  /** Plain text language label shown in the code block header. */
  lang: string;
  code: string;
};

export type DocTip = {
  type: "tip";
  tone?: DocTone;
  title?: string;
  text: string;
};

export type DocTable = {
  type: "table";
  head: string[];
  rows: string[][];
};

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | DocCodeBlock
  | DocTip
  | DocTable;

export type DocTopic = {
  slug: string;
  /** Short label used in the sidebar / navigation. */
  label: string;
  /** Full lesson title, rendered as the page <h1>. */
  title: string;
  /** Bangla description used for metadata. */
  description: string;
  /** Difficulty badge. */
  level?: "Beginner" | "Intermediate" | "Advanced";
  blocks: DocBlock[];
};

export type TechDocs = {
  techSlug: string;
  /** Topic shown at the top of the sidebar / used for redirects. */
  firstTopicSlug: string;
  topics: DocTopic[];
};

export type ResolvedDocTopic = {
  techSlug: string;
  techName: string;
  techColor: string;
  topic: DocTopic;
  href: string;
};

/** Frontmatter stored in every migrated MDX topic file. */
export type DocTopicFrontmatter = {
  title: string;
  label: string;
  order: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  description: string;
};

/** A single lesson file, parsed from `content/<tech>/<topic>.mdx`. */
export type DocTopicFile = {
  techSlug: string;
  slug: string;
  label: string;
  title: string;
  order: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  /** Raw MDX body (rendered via next-mdx-remote / MDX runtime). */
  body: string;
};

/** A technology card, as exported from the docs config JSON/registry. */
export type Technology = {
  slug: string;
  name: string;
  /** Accent color used for badges / active indicators (hex or Tailwind class). */
  color: string;
  /** Short tagline shown on the home grid card. */
  tagline: string;
  /** Optional number of topics surfaced in the UI. */
  topicCount?: number;
};

/** Inline markdown token (feeds the `Inline` renderer). */
export type InlineToken =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "italic"; value: string }
  | { kind: "code"; value: string }
  | { kind: "link"; value: string; url: string };

// ---- Q&A (প্রশ্ন/উত্তর) ----
//
// Kept as a separate content type from the Tutorial `DocTopic` model:
// Q&A owns its own category + question metadata and its own route data.

/** Frontmatter stored in each category manifest `<tech>/questions/<cat>/index.mdx`. */
export type QuestionCategoryFrontmatter = {
  /** Display name shown in the sidebar / breadcrumb (e.g. "Basics"). */
  name: string;
  order: number;
  description?: string;
};

/** Frontmatter stored in each question file `<tech>/questions/<cat>/<q>.mdx`. */
export type QuestionFrontmatter = {
  /** The question itself, rendered as the page title (e.g. "What is HTML?"). */
  question: string;
  order: number;
  description?: string;
};

/** A Q&A category for one technology, resolved from content. */
export type QuestionCategory = {
  techSlug: string;
  slug: string;
  name: string;
  order: number;
  description?: string;
};

/** A single Q&A question, resolved from content. */
export type Question = {
  techSlug: string;
  categorySlug: string;
  slug: string;
  question: string;
  order: number;
  description?: string;
  /** Raw MDX answer body (rendered with the docs components). */
  answer: string;
};
