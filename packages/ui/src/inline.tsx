import { cn } from "@tech-tutor/utils/cn";
import { tokenize } from "@tech-tutor/utils/inline";

/**
 * Renders a tokenized inline-markdown string. Supports `**bold**`,
 * `` `code` ``, `*italic*` and `[link](url)`.
 *
 * @example
 *   <Inline text="Use **npm** to install packages." />
 */
export function Inline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {tokenize(text).map((token, i) => {
        switch (token.kind) {
          case "bold":
            return (
              <strong key={i} className={cn("font-semibold", className)}>
                {token.value}
              </strong>
            );
          case "italic":
            return (
              <em key={i} className={cn("italic", className)}>
                {token.value}
              </em>
            );
          case "code":
            return (
              <code
                key={i}
                className={cn(
                  "rounded-md bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[0.875em] text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
                  className,
                )}
              >
                {token.value}
              </code>
            );
          case "link":
            return (
              <a
                key={i}
                href={token.url}
                className={cn(
                  "font-medium text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400",
                  className,
                )}
              >
                {token.value}
              </a>
            );
          default:
            return <span key={i}>{token.value}</span>;
        }
      })}
    </>
  );
}

/**
 * Renders a paragraph whose content supports inline markdown. Used for
 * `DocBlock["p"]` blocks.
 */
export function InlineParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={cn("leading-7", className)}>
      <Inline text={text} />
    </p>
  );
}
