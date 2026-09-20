/**
 * MigratesTech Tutor documentation from the structured TypeScript block
 * format (`config/docs/*.ts` in the Portfolio) into standalone MDX files
 * under `content/<technology>/<topic-slug>.mdx`.
 *
 * Run from the repo root:
 *   node tools/migrate-content.mjs
 *
 * The generated MDX keeps the exact rendering style of the original system:
 *  - paragraphs   -> <InParagraph text={...} />  (original inline tokenizer)
 *  - headings     -> ## / ### with escaped literal text
 *  - lists        -> markdown ul/ol with MDX-safe inline text
 *  - code         -> <CodeBlock code={...} lang={...} title={...} />
 *  - tips         -> <Tip tone={...} title={...} text={...} />
 *  - tables       -> GFM pipe tables with escaped cells
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const SRC_DIR =
  "D:\\project\\FullStack-Project\\Portfolio\\anamolhasan\\app\\(tech_tutor)\\config\\docs";
const OUT_DIR = path.join(process.cwd(), "content");

function loadTechDocs(filePath) {
  let src = fs.readFileSync(filePath, "utf8");
  src = src.replace(/^import type .*/gm, "");
  src = src.replace(/const docs: TechDocs = \{/, "const docs = {");
  src = src.replace(/export default docs;/, "globalThis.__DOCS = docs;");
  const sandbox = { globalThis: {} };
  vm.runInNewContext(src, sandbox, { filename: path.basename(filePath) });
  return sandbox.globalThis.__DOCS;
}

/** Escape a string for use as a double-quoted YAML scalar (unicode preserved). */
function yamlQuote(value) {
  let out = `"`;
  for (const ch of String(value)) {
    if (ch === "\\") out += "\\\\";
    else if (ch === '"') out += '\\"';
    else if (ch === "\n") out += "\\n";
    else if (ch === "\t") out += "\\t";
    else if (ch === "\r") out += "\\r";
    else out += ch;
  }
  return out + `"`;
}

function json(value) {
  return JSON.stringify(value);
}

/**
 * Escape an inline-markdown run so that the characters `{`, `}`, `<` are
 * rendered literally (MDX would otherwise parse them as JSX/expressions).
 * Characters inside single-backtick inline code spans are left untouched
 * (code spans are already safe and must keep their literal content).
 */
function escapeInline(text) {
  const out = [];
  let inCode = false;
  for (const ch of String(text)) {
    if (ch === "`") {
      inCode = !inCode;
      out.push(ch);
    } else if (!inCode) {
      if (ch === "{" || ch === "}" || ch === "<") out.push("\\" + ch);
      else out.push(ch);
    } else {
      out.push(ch);
    }
  }
  return out.join("");
}

/** Escape heading text so it renders exactly as the original literal string. */
function escapeHeading(text) {
  const out = [];
  for (const ch of String(text)) {
    if ("`{}<".includes(ch)) out.push("\\" + ch);
    else out.push(ch);
  }
  return out.join("");
}

function toMarkdownTable(head, rows) {
  const lines = [];
  const sep = head.map(() => "---");
  lines.push(`| ${head.map((c) => escapeCell(c)).join(" | ")} |`);
  lines.push(`| ${sep.join(" | ")} |`);
  for (const row of rows) {
    lines.push(`| ${row.map((c) => escapeCell(c)).join(" | ")} |`);
  }
  return lines.join("\n");
}

function escapeCell(text) {
  const out = [];
  let inCode = false;
  for (const ch of String(text)) {
    if (ch === "`") {
      inCode = !inCode;
      out.push(ch);
    } else if (!inCode) {
      if (ch === "{" || ch === "}" || ch === "<" || ch === "|") out.push("\\" + ch);
      else out.push(ch);
    } else {
      out.push(ch);
    }
  }
  return out.join("");
}

function renderBlocks(blocks) {
  const sections = [];
  for (const block of blocks) {
    switch (block.type) {
      case "p":
        sections.push(`<InParagraph text={${json(block.text)}} />`);
        break;
      case "h2":
        sections.push(`## ${escapeHeading(block.text)}`);
        break;
      case "h3":
        sections.push(`### ${escapeHeading(block.text)}`);
        break;
      case "list": {
        if (block.ordered) {
          sections.push(block.items.map((it) => `1. ${escapeInline(it)}`).join("\n"));
        } else {
          sections.push(block.items.map((it) => `- ${escapeInline(it)}`).join("\n"));
        }
        break;
      }
      case "code": {
        const attrs = [`code={${json(block.code)}}`, `lang={${json(block.lang)}}`];
        if (block.title) attrs.push(`title={${json(block.title)}}`);
        sections.push(`<CodeBlock ${attrs.join(" ")} />`);
        break;
      }
      case "tip": {
        const attrs = [`tone={${json(block.tone ?? "info")}}`];
        if (block.title) attrs.push(`title={${json(block.title)}}`);
        attrs.push(`text={${json(block.text)}}`);
        sections.push(`<Tip ${attrs.join(" ")} />`);
        break;
      }
      case "table":
        sections.push(toMarkdownTable(block.head, block.rows));
        break;
      default:
        break;
    }
  }
  return sections.join("\n\n");
}

const stats = { techs: 0, topics: 0 };

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => f.endsWith(".ts") && !["types.ts", "index.ts"].includes(f))
  .sort();

for (const file of files) {
  const docs = loadTechDocs(path.join(SRC_DIR, file));
  if (!docs) throw new Error(`Failed to load ${file}`);
  const techDir = path.join(OUT_DIR, docs.techSlug);
  fs.mkdirSync(techDir, { recursive: true });

  docs.topics.forEach((topic, index) => {
    const frontmatter = [
      "---",
      `title: ${yamlQuote(topic.title)}`,
      `label: ${yamlQuote(topic.label)}`,
      `order: ${index + 1}`,
      ...(topic.level ? [`level: ${yamlQuote(topic.level)}`] : []),
      `description: ${yamlQuote(topic.description)}`,
      "---",
    ].join("\n");

    const body = renderBlocks(topic.blocks);
    const mdx = `${frontmatter}\n\n${body}\n`;
    fs.writeFileSync(path.join(techDir, `${topic.slug}.mdx`), mdx, "utf8");
    stats.topics += 1;
  });

  stats.techs += 1;
  console.log(`${docs.techSlug}: ${docs.topics.length} topics`);
}

console.log(`\nDone. ${stats.techs} technologies, ${stats.topics} topics -> ${OUT_DIR}`);