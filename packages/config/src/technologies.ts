import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Blocks,
  Braces,
  Database,
  DatabaseZap,
  FileCode2,
  FileType2,
  GitBranch,
  GitCompare,
  GitFork,
  Layers,
  Boxes,
  Container,
  Orbit,
  Palette,
  Route,
  Server,
  Smartphone,
  Table2,
  Wind,
} from "lucide-react";

/**
 * A single learning technology shown across the Tech Tutor section.
 * `progress` and `lessonsCompleted` are demo/seed values rendered on the
 * dashboard and technology overview pages.
 */
export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "devops"
  | "office"
  | "others";

export type Technology = {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  /** Text color utility used for accent icons (e.g. navbar / stats). */
  color: string;
  /** Tailwind gradient fragments used for icon chip backgrounds. */
  gradient: string;
  /** Overall learning progress for this technology (0-100). */
  progress: number;
  lessonsCompleted: number;
  category: TechnologyCategory;
};

export const technologies: Technology[] = [
  {
    id: "html",
    name: "HTML",
    slug: "html",
    icon: FileCode2,
    tagline: "Markup for the web",
    description:
      "Learn the foundational markup language used to structure every page on the internet.",
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-amber-600",
    progress: 86,
    lessonsCompleted: 12,
    category: "frontend",
  },
  {
    id: "css",
    name: "CSS",
    slug: "css",
    icon: Palette,
    tagline: "Style with confidence",
    description:
      "Master styling, layouts, flexbox, grid and responsive design with modern CSS.",
    color: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-blue-600",
    progress: 54,
    lessonsCompleted: 6,
    category: "frontend",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    slug: "tailwind",
    icon: Wind,
    tagline: "দ্রুত ও সুন্দর UI তৈরি করুন",
    description:
      "Utility classes ব্যবহার করে styling, layout, Flexbox, Grid, responsive design, typography এবং modern UI development শিখুন।",
    color: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-cyan-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    icon: Braces,
    tagline: "Life of the web",
    description:
      "Go from variables to modules — the language that powers interactive application.",
    color: "text-yellow-600 dark:text-yellow-400",
    gradient: "from-yellow-400 to-amber-500",
    progress: 68,
    lessonsCompleted: 9,
    category: "frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    slug: "typescript",
    icon: FileType2,
    tagline: "JavaScript that scales",
    description:
      "Bring types, safety and great tooling to your JavaScript projects.",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-600",
    progress: 32,
    lessonsCompleted: 4,
    category: "frontend",
  },
  {
    id: "react",
    name: "React",
    slug: "react",
    icon: Atom,
    tagline: "UI by component",
    description:
      "Build interactive user interfaces with reusable components and hooks.",
    color: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-500 to-teal-600",
    progress: 41,
    lessonsCompleted: 5,
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    slug: "nextjs",
    icon: Orbit,
    tagline: "The React framework",
    description:
      "Full-stack React with file-based routing, server components and edge-ready deploys.",
    color: "text-zinc-700 dark:text-zinc-300",
    gradient: "from-zinc-600 to-zinc-900",
    progress: 18,
    lessonsCompleted: 2,
    category: "frontend",
  },
  {
    id: "nodejs",
    name: "Node.js",
    slug: "nodejs",
    icon: Server,
    tagline: "JavaScript on the server",
    description:
      "Run JavaScript outside the browser — modules, the event loop and the file system.",
    color: "text-green-600 dark:text-green-400",
    gradient: "from-green-500 to-emerald-600",
    progress: 27,
    lessonsCompleted: 3,
    category: "backend",
  },
  {
    id: "express",
    name: "Express",
    slug: "express",
    icon: Route,
    tagline: "Minimal Node API layer",
    description:
      "The battle-tested framework for building fast, unopinionated HTTP servers.",
    color: "text-slate-600 dark:text-slate-300",
    gradient: "from-slate-500 to-slate-700",
    progress: 12,
    lessonsCompleted: 1,
    category: "backend",
  },
  {
    id: "expo",
    name: "Expo",
    slug: "expo",
    icon: Smartphone,
    tagline: "Build cross-platform mobile apps",
    description:
      "Expo + React Native দিয়ে iOS, Android ও Web-এ চলে এমন একটি সম্পূর্ণ mobile app তৈরি করুন — Expo Router navigation, state, AsyncStorage, camera, notifications, SQLite, API sync, EAS Build ও App Store submission পর্যন্ত।",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-indigo-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "mobile",
  },
  {
    id: "wordpress",
    name: "WordPress",
    slug: "wordpress",
    icon: Blocks,
    tagline: "The world's most popular CMS",
    description:
      "WordPress দিয়ে website-এর সবকিছু শিখুন — CMS, Theme, Plugin, Page/Post, Gutenberg, Elementor, WooCommerce, Database, Hosting, Domain, cPanel, Architecture ও complete website তৈরি।",
    color: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-indigo-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "office",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    slug: "postgresql",
    icon: DatabaseZap,
    tagline: "Relational database powerhouse",
    description:
      "PostgreSQL-এর সম্পূর্ণ বাংলা গাইড — relational model, SQL joins, aggregation, window functions, transactions, indexing, JSONB, full-text search, backup, Prisma ও Node.js integration — অবিরত TechShop e-commerce database project নিয়ে।",
    color: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-blue-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "database",
  },
  {
    id: "prisma-postgres",
    name: "PrismaPostgres",
    slug: "prisma-postgres",
    icon: GitCompare,
    tagline: "Type-safe ORM for PostgreSQL",
    description:
      "Prisma-র সম্পূর্ণ বাংলা গাইড — schema-driven model, migrations, type-safe CRUD, nested writes, transactions, aggregation, groupBy, JSON fields, raw SQL, Next.js/Express integration — অবিরত TechShop e-commerce database project নিয়ে।",
    color: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "database",
  },
  {
    id: "nestjs",
    name: "NestJS",
    slug: "nestjs",
    icon: Boxes,
    tagline: "Scalable Node.js backend",
    description:
      "Enterprise-grade Node.js framework with modular architecture, dependency injection and TypeScript-first design.",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-rose-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "backend",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    slug: "mongodb",
    icon: Database,
    tagline: "Documents, not rows",
    description:
      "Work with a flexible document database — collections, queries and aggregation.",
    color: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-green-700",
    progress: 9,
    lessonsCompleted: 1,
    category: "database",
  },
  {
    id: "docker",
    name: "Docker",
    slug: "docker",
    icon: Container,
    tagline: "Ship apps anywhere",
    description:
      "Containerization শিখুন — Image, Container, Dockerfile, Compose, production deploy ও DevOps workflow.",
    color: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-blue-700",
    progress: 64,
    lessonsCompleted: 16,
    category: "devops",
  },
  {
    id: "tanstack-nextjs",
    name: "TanStack",
    slug: "tanstack-nextjs",
    icon: Table2,
    tagline: "Build a production-style CRUD app",
    description:
      "Next.js + TypeScript + Axios + TanStack Query + TanStack Table + React Hook Form + Zod দিয়ে একটি সম্পূর্ণ Product Management Dashboard তৈরি করুন।",
    color: "text-lime-600 dark:text-lime-400",
    gradient: "from-lime-500 to-emerald-600",
    progress: 0,
    lessonsCompleted: 0,
    category: "frontend",
  },
  {
    id: "redux-rtk",
    name: "RTK Query",
    slug: "redux-rtk",
    icon: Layers,
    tagline: "Predictable state + powerful data fetching",
    description:
      "Redux Toolkit দিয়ে global state management এবং RTK Query দিয়ে server data fetching, caching ও mutation শিখুন — একটি E-commerce Storefront + Shopping Cart project-এর মাধ্যমে।",
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-violet-700",
    progress: 0,
    lessonsCompleted: 0,
    category: "frontend",
  },
  {
    id: "git",
    name: "Git",
    slug: "git",
    icon: GitBranch,
    tagline: "Version control basics",
    description:
      "Track changes, branch and merge like a pro with the world's leading VCS.",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-orange-600",
    progress: 45,
    lessonsCompleted: 5,
    category: "devops",
  },
  {
    id: "github",
    name: "GitHub",
    slug: "github",
    icon: GitFork,
    tagline: "Host, review, ship",
    description:
      "Collaborate with remote repositories, issues, pull requests and CI workflows.",
    color: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-600 to-fuchsia-600",
    progress: 21,
    lessonsCompleted: 2,
    category: "devops",
  },
];

export function getTechnology(slug: string): Technology | undefined {
  return technologies.find((tech) => tech.slug === slug);
}

export const BASE_URL = "/tech-tutor";

/** Technologies surfaced in the dashboard "Quick access" shortcuts. */
export const quickAccessSlugs = [
  "html",
  "css",
  "javascript",
  "react",
  "nextjs",
  "nodejs",
  "express",
] as const;

/** Total lessons completed across every technology (seed data). */
export const getTotalLessonsCompleted = (): number =>
  technologies.reduce((sum, tech) => sum + tech.lessonsCompleted, 0);

/** Average learning progress across all technologies (0-100). */
export const getOverallProgress = (): number =>
  Math.round(
    technologies.reduce((sum, tech) => sum + tech.progress, 0) /
      technologies.length,
  );

/** Fixed display order for technology categories in the Quick Start section. */
export const TECHNOLOGY_CATEGORIES: {
  slug: TechnologyCategory;
  label: string;
}[] = [
  { slug: "frontend", label: "Frontend" },
  { slug: "backend", label: "Backend" },
  { slug: "mobile", label: "Mobile" },
  { slug: "database", label: "Database" },
  { slug: "devops", label: "DevOps" },
  { slug: "office", label: "Office & Applications" },
  { slug: "others", label: "Others" },
];

/** Technologies grouped by category, each group sorted by name descending. */
export const getTechnologiesByCategory = () =>
  TECHNOLOGY_CATEGORIES.map((category) => ({
    ...category,
    technologies: technologies
      .filter((tech) => tech.category === category.slug)
      .sort((a, b) => b.name.localeCompare(a.name)),
  }));