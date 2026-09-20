"use client";

import { createContext, useContext, type ReactNode } from "react";

import type {
  QuestionCategoryIndex,
  SearchIndexTopic,
} from "@tech-tutor/config";

type DocDataContextValue = {
  topics: SearchIndexTopic[];
  /** Serialisable Q&A category index (server-loaded in the layout). */
  questionCategories: QuestionCategoryIndex[];
};

const DocDataContext = createContext<DocDataContextValue | null>(null);

/**
 * Provides the serialisable topic + Q&A category index (loaded server-side
 * inside the layout) to client components such as the search dialog and
 * sidebar.
 */
export const DocDataProvider = ({
  topics,
  questionCategories,
  children,
}: {
  topics: SearchIndexTopic[];
  questionCategories: QuestionCategoryIndex[];
  children: ReactNode;
}) => {
  return (
    <DocDataContext.Provider value={{ topics, questionCategories }}>
      {children}
    </DocDataContext.Provider>
  );
};

export const useDocData = (): DocDataContextValue => {
  const context = useContext(DocDataContext);
  if (!context) {
    throw new Error("useDocData must be used within DocDataProvider");
  }
  return context;
};