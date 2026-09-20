import type { InlineToken } from "@tech-tutor/types";

export type { InlineToken };

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

/**
 * Splits an inline-markdown string into `InlineToken`s. Supports:
 *
 * - `**bold**`
 * - `*italic*`
 * - `` `code` ``
 * - `[text](url)` links
 *
 * Used by the `Inline` / `InlineParagraph` UI components.
 */
export function tokenize(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];

  String(text)
    .split(INLINE_PATTERN)
    .forEach((part) => {
      if (!part) return;

      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        tokens.push({ kind: "bold", value: part.slice(2, -2) });
      } else if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        tokens.push({ kind: "code", value: part.slice(1, -1) });
      } else if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        tokens.push({ kind: "italic", value: part.slice(1, -1) });
      } else {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          tokens.push({ kind: "link", value: match[1], url: match[2] });
        } else {
          tokens.push({ kind: "text", value: part });
        }
      }
    });

  return tokens;
}

/**
 * A stable, url-safe id derived from a heading's text. Preserves Bengali
 * letters so on-page TOC anchors keep their readable slugs.
 */
export function slugifyHeading(text: string): string {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0980-\u09FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
