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
import { DEFAULT_PATH } from "@/routes/paths";
import { ModulesContext } from "../contexts/ModulesContext";

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

  const moduleTabs = useMemo(() => [
    {
      key: "services",
      name: t("common.modules.services"),
      icon: <IconCalendarEvent size={18} />,
    },
    {
      key: "therapists",
      name: t("common.modules.therapists"),
      icon: <IconStethoscope size={18} />,
      hide: !profile?.admin,
    },
    {
      key: "patients",
      name: t("common.modules.patients"),
      icon: <IconUsers size={18} />,
    },
    {
      key: "payments",
      name: t("common.modules.payments"),
      icon: <IconReportMoney size={18} />,
    },
  ], [t, profile?.admin]);

  const changeActiveModule = useCallback((module: ModuleKey) => {
    if (moduleTabs.find((mod) => mod.key === module)?.hide) {
      openNotification("warning", t("auth.errors.notAllowedModule"));
      return navigate(DEFAULT_PATH);
    }

    setActiveModule(module);
    changeDocumentTitle(t(`common.modules.${module}`));
  }, [
    moduleTabs,
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
        moduleTabs,
        changeDocumentTitle,
        changeActiveModule,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};
