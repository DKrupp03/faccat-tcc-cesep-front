import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCalendarEvent,
  IconStethoscope,
  IconUsers,
  IconReportMoney,
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
        <IconCalendarEvent
          size={18}
          color={isModuleActive("services") ? COLORS.white : COLORS.grey70}
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
          color={isModuleActive("therapists") ? COLORS.white : COLORS.grey70}
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
          color={isModuleActive("patients") ? COLORS.white : COLORS.grey70}
        />
      ),
    },
    {
      key: "payments",
      path: PATHS.payments,
      name: t("common.modules.payments"),
      icon: (
        <IconReportMoney
          size={18}
          color={isModuleActive("payments") ? COLORS.white : COLORS.grey70}
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
