import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CircleAlert } from "lucide-react";

import { mdxComponents } from "@/lib/mdx-components";

/**
 * Compiles the migrated MDX body and renders it into the main
 * documentation column, matching the original structured-block layout.
 */
export async function DocContent({ mdx }: { mdx: string }) {
  const { content } = await compileMDX({
    source: mdx,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });

  return (
    <div className="flex flex-col gap-5">
      {content}
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-[12px] text-muted-foreground">
        <CircleAlert className="size-3.5 shrink-0 text-primary" />
        <span>
          শেষ প্যারায় নিজে practice করুন — কোড কপি করে নিজের এডিটরে চালিয়ে
          দেখুন।
        </span>
      </div>
    </div>
  );
}