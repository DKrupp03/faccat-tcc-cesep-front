import { createContext, type Dispatch, type SetStateAction } from "react";

import { type CommonHeaderType } from "../types/common";

type ModuleKey = "services" | "therapists" | "patients" | "payments";

export type ModuleType = {
  key: ModuleKey;
  path: string;
  name: string;
  icon: React.ReactNode;
  notAllowed?: boolean;
};

export type ModulesContextType = {
  activeModule: ModuleKey | undefined;
  changeDocumentTitle: (title: string) => void;
  changeActiveModule: (module: ModuleKey) => void;
  isModuleActive: (module: ModuleKey) => boolean;
  modules: ModuleType[];
  isModuleAllowed: (module: ModuleKey) => boolean;
  headerContent: CommonHeaderType;
  setHeaderContent: Dispatch<SetStateAction<CommonHeaderType>>;
};

export const ModulesContext = createContext<ModulesContextType | null>(null);
