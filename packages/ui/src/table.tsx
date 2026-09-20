import { cn } from "@tech-tutor/utils/cn";
import type { DocTable } from "@tech-tutor/types";

export function Table({
  block,
  className,
}: {
  block: DocTable;
  className?: string;
}) {
  return (
    <div className={cn("my-5 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800", className)}>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60">
            {block.head.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
