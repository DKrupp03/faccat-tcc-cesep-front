import { createContext } from "react";

import type { CommonTabsProps } from "../components/CommonTabs/CommonTabs";

export type ModuleKey = "services" | "therapists" | "patients" | "payments";

export type ModulesContextType = {
  activeModule: ModuleKey | undefined;
  moduleTabs: CommonTabsProps["tabs"];
  changeDocumentTitle: (title: string) => void;
  changeActiveModule: (module: ModuleKey) => void;
};

export const ModulesContext = createContext<ModulesContextType | null>(null);
