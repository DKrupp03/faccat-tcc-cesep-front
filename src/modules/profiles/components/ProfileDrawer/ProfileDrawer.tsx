import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconEdit,
  IconReportAnalytics,
  IconActivity,
  IconCalendarEvent,
  IconReportMoney,
  IconUsers,
} from "@tabler/icons-react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

import { useProfiles } from "../../hooks/useProfiles";
import { ProfileForm, ProfileFormOptions } from "../ProfileForm/ProfileForm";

type TabsType = "form"
  | "anamnese"
  | "medicalRecords"
  | "services"
  | "payments"
  | "patients";

export const ProfileDrawer = () => {
  const { t } = useTranslation();
  const {
    isFormOpen,
    setIsFormOpen,
    profile,
    editingRole,
  } = useProfiles();

  const [tab, setTab] = useState<TabsType>("form");

  const tabs = useMemo(() => ([
    {
      key: "form",
      name: t("profiles.tabs.form"),
      icon: <IconEdit size={18} />,
    },
    {
      key: "anamnese",
      name: t("profiles.tabs.anamnese"),
      icon: <IconReportAnalytics size={18} />,
      hide: editingRole !== "patient",
      disabled: !profile?.id,
    },
    {
      key: "medicalRecords",
      name: t("profiles.tabs.medicalRecords"),
      icon: <IconActivity size={18} />,
      hide: editingRole !== "patient",
      disabled: !profile?.id,
    },
    {
      key: "services",
      name: t("profiles.tabs.services"),
      icon: <IconCalendarEvent size={18} />,
      disabled: !profile?.id,
    },
    {
      key: "payments",
      name: t("profiles.tabs.payments"),
      icon: <IconReportMoney size={18} />,
      hide: editingRole !== "patient",
      disabled: !profile?.id,
    },
    {
      key: "patients",
      name: t("profiles.tabs.patients"),
      icon: <IconUsers size={18} />,
      hide: editingRole !== "therapist",
      disabled: !profile?.id,
    },
  ]), [t, editingRole, profile?.id]);

  const footer = useMemo(() => {
    if (tab === "form") {
      return <ProfileFormOptions />;
    }
  }, [tab]);

  const content = useMemo(() => {
    if (tab === "form") {
      return <ProfileForm />;
    }
  }, [tab]);

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
  }, [setIsFormOpen]);

  return (
    <>
      <CommonDrawer
        isOpen={isFormOpen}
        close={handleClose}
        title={t(`profiles.tabs.${tab}`)}
        footer={footer}
        tabs={tabs}
        activeTab={tab}
        onChangeTab={(key) => setTab(key as TabsType)}
        showTabs
      >
        {content}
      </CommonDrawer>
    </>
  );
};
