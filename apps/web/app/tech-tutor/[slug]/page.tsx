import { redirect } from "next/navigation";

import {
  BASE_URL,
  docTopicHref,
  getAllTopics,
  getFirstDocTopic,
} from "@tech-tutor/config/server";

export const dynamicParams = false;

export async function generateStaticParams() {
  const topics = getAllTopics();
  const slugs = [...new Set(topics.map((topic) => topic.techSlug))];
  return slugs.map((slug) => ({ slug }));
}

type TechTutorTechnologyPageProps = {
  params: Promise<{ slug: string }>;
};

const TechTutorTechnologyPage = async ({
  params,
}: TechTutorTechnologyPageProps) => {
  const { slug } = await params;
  const first = getFirstDocTopic(slug);
  redirect(first ? docTopicHref(slug, first.slug) : BASE_URL);
};

export default TechTutorTechnologyPage;