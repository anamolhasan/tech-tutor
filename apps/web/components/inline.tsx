import Link from "next/link";

import { cn } from "@/lib/utils";
import { tokenize } from "@tech-tutor/utils/inline";

/**
 * Renders lightweight inline formatting used across tech tutor docs:
 * `**bold**`, `*italic*`, `` `code` `` and `[text](url)`.
 */
export function Inline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const tokens = tokenize(text);

  return (
    <span className={className}>
      {tokens.map((token, index) => {
        switch (token.kind) {
          case "bold":
            return (
              <strong key={index} className="font-semibold text-foreground">
                {token.value}
              </strong>
            );
          case "italic":
            return <em key={index}>{token.value}</em>;
          case "code":
            return (
              <code
                key={index}
                className="rounded-md border border-border/70 bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
              >
                {token.value}
              </code>
            );
          case "link": {
            const isExternal = /^https?:\/\//.test(token.url);
            if (isExternal) {
              return (
                <a
                  key={index}
                  href={token.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {token.value}
                </a>
              );
            }
            return (
              <Link
                key={index}
                href={token.url}
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                {token.value}
              </Link>
            );
          }
          default:
            return <span key={index}>{token.value}</span>;
        }
      })}
    </span>
  );
}

interface InlineParagraphProps {
  text: string;
  className?: string;
}

/** Paragraph that supports inline formatting and Bangla-friendly leading. */
export function InlineParagraph({
  text,
  className,
}: InlineParagraphProps) {
  return (
    <p className={cn("leading-7 text-muted-foreground", className)}>
      <Inline text={text} />
    </p>
  );
}