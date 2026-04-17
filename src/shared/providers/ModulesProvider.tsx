import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCalendarMonth,
  IconStethoscope,
  IconUsers,
  IconPremiumRights,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import { PATHS, DEFAULT_PATH } from "@/routes/paths";
import { COLORS } from "@/shared/theme";
import { ModulesContext, type ModuleType } from "../contexts/ModulesContext";

type ModuleKey = "services" | "therapists" | "patients" | "payments";

export const ModulesProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { openNotification } = useNotification();

  const [activeModule, setActiveModule] = useState<ModuleKey>();

  const changeDocumentTitle = useCallback((title: string) => {
    document.title = `${title} | CESEP`;
  }, []);

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
          size={18}
          stroke={1.5}
          color={isModuleActive("services") ? COLORS.primary.grey : COLORS.primary.grey}
        />
      ),
    },
    {
      key: "therapists",
      path: PATHS.therapists,
      name: t("common.modules.therapists"),
      icon: (
        <IconStethoscope
          size={18}
          stroke={1.5}
          color={isModuleActive("therapists") ? COLORS.primary.main : COLORS.primary.grey}
        />
      ),
      onlyAdmin: true,
    },
    {
      key: "patients",
      path: PATHS.patients,
      name: t("common.modules.patients"),
      icon: (
        <IconUsers
          size={18}
          stroke={1.5}
          color={isModuleActive("patients") ? COLORS.primary.main : COLORS.primary.grey}
        />
      ),
    },
    {
      key: "payments",
      path: PATHS.payments,
      name: t("common.modules.payments"),
      icon: (
        <IconPremiumRights
          size={18}
          stroke={1.5}
          color={isModuleActive("payments") ? COLORS.primary.main : COLORS.primary.grey}
        />
      ),
    },
  ], [t, isModuleActive]);

  const isModuleAllowed = useCallback((key: ModuleKey) => (
    !modules.find((mod) => mod.key === key)?.onlyAdmin || profile?.role === "admin"
  ), [modules, profile]);

  const changeActiveModule = useCallback((module: ModuleKey) => {
    if (!isModuleAllowed(module)) {
      openNotification("warning", t("auth.errors.notAllowedModule"));
      return navigate(DEFAULT_PATH);
    }

    setActiveModule(module);
    changeDocumentTitle(t(`common.modules.${module}`));
  }, [
    isModuleAllowed,
    openNotification,
    navigate,
    setActiveModule,
    changeDocumentTitle,
    t,
  ]);

  return (
    <ModulesContext.Provider
      value={{
        activeModule,
        changeDocumentTitle,
        changeActiveModule,
        isModuleActive,
        modules,
        isModuleAllowed,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};
