"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type DocNavContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const DocNavContext = createContext<DocNavContextValue | null>(null);

export const DocNavProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DocNavContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </DocNavContext.Provider>
  );
};

export const useDocNav = (): DocNavContextValue => {
  const context = useContext(DocNavContext);
  if (!context) {
    throw new Error("useDocNav must be used within DocNavProvider");
  }
  return context;
};