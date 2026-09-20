export {
  BASE_URL,
  quickAccessSlugs,
  technologies,
  getTechnology,
  getTotalLessonsCompleted,
  getOverallProgress,
  TECHNOLOGY_CATEGORIES,
  getTechnologiesByCategory,
} from "./technologies";
export type { Technology, TechnologyCategory } from "./technologies";

export type { DocHeading, ResolvedDocTopic, SearchIndexTopic } from "./docs";
export type {
  QuestionCategoryIndex,
  QuestionCategoryListItem,
} from "./questions";