import { createContext, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCalendarMonth,
  IconStethoscope,
  IconUsers,
  IconPremiumRights,
} from "@tabler/icons-react";

import { PATHS } from "@/routes/paths";
import { COLORS } from "@/shared/theme";

type ModuleKey = "services" | "therapists" | "patients" | "payments";

type ModuleType = {
  key: ModuleKey;
  path: string;
  name: string;
  icon: React.ReactNode;
};

type ModulesContextType = {
  activeModule: ModuleKey | undefined;
  changeDocumentTitle: (title: string) => void;
  changeActiveModule: (module: ModuleKey) => void;
  isModuleActive: (module: ModuleKey) => boolean;
  modules: ModuleType[];
};

export const ModulesContext = createContext<ModulesContextType | null>(null);

export const ModulesProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const [activeModule, setActiveModule] = useState<ModuleKey>();

  const changeDocumentTitle = useCallback((title: string) => {
    document.title = `${title} | CESEP`;
  }, []);

  const changeActiveModule = useCallback((module: ModuleKey) => {
    setActiveModule(module);
    changeDocumentTitle(t(`common.modules.${module}`));
  }, [setActiveModule, t, changeDocumentTitle]);

  const isModuleActive = useCallback((key: ModuleKey) => (
    activeModule === key
  ), [activeModule]);

  const modules: ModuleType[] = useMemo(() => [
    {
      key: "services",
      path: PATHS.services,
      name: t("common.modules.services"),
      icon: (
        <IconCalendarMonth
          size={16}
          color={isModuleActive("services") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
    {
      key: "therapists",
      path: PATHS.therapists,
      name: t("common.modules.therapists"),
      icon: (
        <IconStethoscope
          size={16}
          color={isModuleActive("therapists") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
    {
      key: "patients",
      path: PATHS.patients,
      name: t("common.modules.patients"),
      icon: (
        <IconUsers
          size={16}
          color={isModuleActive("patients") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
    {
      key: "payments",
      path: PATHS.payments,
      name: t("common.modules.payments"),
      icon: (
        <IconPremiumRights
          size={16}
          color={isModuleActive("payments") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
  ], [isModuleActive, t]);

  return (
    <ModulesContext.Provider
      value={{
        activeModule,
        changeDocumentTitle,
        changeActiveModule,
        isModuleActive,
        modules,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
}
