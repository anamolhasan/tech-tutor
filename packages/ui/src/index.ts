// @tech-tutor/ui — presentational doc primitives.
//
// Kept intentionally thin: only the components needed to render migrated
// MDX blocks. Layout chrome (sidebar, toc, toolbar, topbar, search, pager)
// lives in the consuming apps so this package stays build-clean with zero
// app-specific dependencies.

export { cn } from "@tech-tutor/utils/cn";

export * from "./inline";
export * from "./code-inline";
export * from "./code-block";
export * from "./tip";
export * from "./table";
export * from "./badge";

export type {
  DocBlock,
  DocCodeBlock,
  DocTip,
  DocTable,
  DocTone,
} from "@tech-tutor/types";
