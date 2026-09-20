# tech-tutor

বাংলা ওয়েব ডেভেলপমেন্ট ডকুমেন্টেশন — একটি Turborepo-based monorepo। Portfolio-এর
`config/docs/*.ts`-এর structured block কনটেন্টকে self-contained MDX `content/`
তৈরি করে standalone as a monorepo-তে নিয়ে আসা হয়েছে।

## কনটেন্ট (20 টি প্রযুক্তি, ৫২৬ টি টপিক)

```
content/
├─ html/          (১৮ টপিক)
├─ css/           (৪০ টপিক)
├─ ...
└─ <tech-slug>/<topic-slug>.mdx
```

প্রতিটি MDX ফাইলে YAML frontmatter (title, label, order, level, description) ও
custom components ব্যবহার করা হয়েছে:

- `<InParagraph text={...} />`
- `<CodeBlock code={...} lang={...} title={...} />`
- `<Tip tone={...} title={...} text={...} />`
- GFM tables / list / code

## মনোরিপো স্ট্রাকচার

```
tech-tutor/
├─ apps/
│  └─ web/                 # Next.js অ্যাপ (App Router, Docs)
├─ packages/
│  ├─ config/              # Tech Tutor ডেটা + ডক/Q&A সার্চ ইনডেক্স
│  │  ├─ @tech-tutor/config         (client-safe: technologies)
│  │  └─ @tech-tutor/config/server  (docs/questions, node:fs)
│  ├─ types/               # শেয়ারড টাইপ (Technology, Question, …)
│  ├─ utils/               # cn, inline tokenizer, content loader (node)
│  ├─ ui/                  # Inline, InlineParagraph, CodeBlock, Tip + primitives
│  ├─ eslint-config/       # shared flat configs (base, next-js, react-internal)
│  └─ typescript-config/   # shared tsconfigs (base, nextjs, react-library)
└─ tools/
   └─ migrate-content.mjs  # TS blocks → MDX কনভার্টার
```

## শুরু করুন

```bash
# pnpm 10.x প্রিসেট
pnpm install
pnpm dev            # apps/web → http://localhost:3000
pnpm check-types    # tsc --noEmit (প্রতিটি package)
pnpm lint           # shared eslint configs (প্রতিটি package)
pnpm build          # production build (turbo)
```

## টুলস

`tools/migrate-content.mjs` — Portfolio `config/docs/*.ts`-এর block structure
থেকে MDX তৈরি করে। সোর্স ফাইলগুলো বিশ্লেষণ (inline braces, table pipes,
heading escapes, Bangla) করে মাইগ্রেট করা হয়েছে — 526 টি টপিক।
