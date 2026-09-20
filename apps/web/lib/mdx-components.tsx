import {
  isValidElement,
  type ReactNode,
} from "react";
import Link from "next/link";

import { slugifyHeading } from "@tech-tutor/utils/inline";
import CodeBlock from "@/components/code-block";
import Tip from "@/components/tip";
import { InlineParagraph } from "@/components/inline";

/** Flattens React children into plain text (for heading ids + TOC anchors). */
function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return nodeToText(props.children);
  }
  return "";
}

function Heading2({ children }: { children?: ReactNode }) {
  const text = nodeToText(children);
  return (
    <h2
      id={slugifyHeading(text)}
      className="group scroll-mt-36 font-heading text-xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

function Heading3({ children }: { children?: ReactNode }) {
  const text = nodeToText(children);
  return (
    <h3
      id={slugifyHeading(text)}
      className="group scroll-mt-36 font-heading text-base font-semibold tracking-tight text-foreground"
    >
      {children}
    </h3>
  );
}

function MdxParagraph({ children }: { children?: ReactNode }) {
  return (
    <p className="leading-7 text-[15px] text-muted-foreground">{children}</p>
  );
}

function MdxUl({ children }: { children?: ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] text-muted-foreground marker:text-primary/70">
      {children}
    </ul>
  );
}

function MdxOl({ children }: { children?: ReactNode }) {
  return (
    <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] text-muted-foreground marker:font-medium marker:text-primary">
      {children}
    </ol>
  );
}

function MdxLi({ children }: { children?: ReactNode }) {
  return <li className="leading-7">{children}</li>;
}

function MdxTable({ children }: { children?: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/80">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function MdxTHead({ children }: { children?: ReactNode }) {
  return <thead>{children}</thead>;
}

function MdxTBody({ children }: { children?: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function MdxTr({ children }: { children?: ReactNode }) {
  return <tr className="border-b border-border/60 last:border-b-0">{children}</tr>;
}

function MdxTh({ children }: { children?: ReactNode }) {
  return (
    <th className="border-b border-border/80 bg-muted/50 px-4 py-2.5 text-left text-[12px] font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </th>
  );
}

function MdxTd({ children }: { children?: ReactNode }) {
  return (
    <td className="px-4 py-2.5 align-top leading-6 text-muted-foreground">
      {children}
    </td>
  );
}

function MdxStrong({ children }: { children?: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

function MdxEm({ children }: { children?: ReactNode }) {
  return <em>{children}</em>;
}

function MdxCode({ children }: { children?: ReactNode }) {
  return (
    <code className="rounded-md border border-border/70 bg-muted/70 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

function MdxLink({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  if (!href) return <>{children}</>;
  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
    >
      {children}
    </Link>
  );
}

/** Component mapping for the migrated MDX bodies. */
export const mdxComponents = {
  InParagraph: ({ text }: { text: string }) => (
    <InlineParagraph text={text} className="text-[15px]" />
  ),
  CodeBlock,
  Tip,
  h2: Heading2,
  h3: Heading3,
  p: MdxParagraph,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  table: MdxTable,
  thead: MdxTHead,
  tbody: MdxTBody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  strong: MdxStrong,
  em: MdxEm,
  code: MdxCode,
  a: MdxLink,
};