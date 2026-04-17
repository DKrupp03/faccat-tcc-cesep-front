import { createContext } from "react";

export type ModuleKey = "services" | "therapists" | "patients" | "payments";

export type ModuleType = {
  key: ModuleKey;
  path: string;
  name: string;
  icon: React.ReactNode;
  onlyAdmin?: boolean;
};

export type ModulesContextType = {
  activeModule: ModuleKey | undefined;
  changeDocumentTitle: (title: string) => void;
  changeActiveModule: (module: ModuleKey) => void;
  isModuleActive: (module: ModuleKey) => boolean;
  modules: ModuleType[];
  isModuleAllowed: (module: ModuleKey) => boolean;
};

export const ModulesContext = createContext<ModulesContextType | null>(null);
