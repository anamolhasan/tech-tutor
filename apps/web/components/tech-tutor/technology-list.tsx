import Link from "next/link";

import {
  BASE_URL,
  docTopicHref,
  getFirstDocTopic,
  getTechnologiesByCategory,
  TECHNOLOGY_CATEGORIES,
} from "@tech-tutor/config/server";

const TechnologyList = () => {
  const categories = getTechnologiesByCategory();

  const columns = [
    { slug: "frontend", label: "Frontend" },
    { slug: "backend", label: "Backend" },
    { slug: "database", label: "Database" },
  ].map((column) => ({
    ...column,
    technologies:
      categories.find((category) => category.slug === column.slug)
        ?.technologies ?? [],
  }));

  columns.push({
    slug: "others",
    label:
      TECHNOLOGY_CATEGORIES.find((category) => category.slug === "others")
        ?.label ?? "Others",
    technologies: categories
      .filter((category) =>
        ["mobile", "devops", "office", "others"].includes(category.slug),
      )
      .flatMap((category) => category.technologies)
      .sort((a, b) => a.name.localeCompare(b.name)),
  });

  return (
    <section
      id="technologies-list"
      className="mx-auto w-full max-w-400 px-4 pb-16 sm:px-6"
    >
      {/* Section heading */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Technologies
        </h2>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Explore our documentation and learning resources.
        </p>
      </div>

      {/* Technology columns */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {columns.map((column) => (
          <div key={column.slug}>
            {/* Category */}
            <h3 className="border-b border-border/60 pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {column.label}
            </h3>

            {/* Technology list */}
            <ul className="mt-2">
              {column.technologies.map((tech) => {
                const first = getFirstDocTopic(tech.slug);

                const href = first
                  ? docTopicHref(tech.slug, first.slug)
                  : `${BASE_URL}/${tech.slug}`;

                return (
                  <li key={tech.slug}>
                    <Link
                      href={href}
                      className="block border-b border-border/40 py-2.5 text-[13px] text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground"
                    >
                      {tech.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologyList;