import { useMemo, useState, useCallback } from "react";
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

import { ProfilesListProvider } from "../../providers/ProfilesListProvider";
import { useProfileDrawer } from "../../hooks/useProfileDrawer";
import { ProfileForm, ProfileFormOptions } from "../ProfileForm/ProfileForm";
import { ProfilePatients, ProfilePatientsOptions } from "../ProfilePatients/ProfilePatients";
import { PatientAnamneseForm, PatientAnamneseFormOptions } from "../PatientAnamneseForm/PatientAnamneseForm";
import type { ProfileRole } from "../../types/profile";

export const ProfileDrawer = () => {
  const { t } = useTranslation();
  const { isFormOpen, profile, editingRole, tab, handleClose, handleChangeTab } = useProfileDrawer();

  const [openPatientForm, setOpenPatientForm] = useState<(() => void) | undefined>();

  const handlePatientsOpenFormReady = useCallback((openForm: (role: ProfileRole) => void) => {
    setOpenPatientForm(() => () => openForm("patient"));
  }, []);

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

  const header = useMemo(() => {
    if (tab === "patients") return <ProfilePatientsOptions onCreateClick={openPatientForm} />;
  }, [tab, openPatientForm]);

  const content = useMemo(() => {
    if (tab === "form") return <ProfileForm />;

    if (tab === "patients") return (
      <ProfilePatients
        therapistId={profile?.id as number}
        onOpenFormReady={handlePatientsOpenFormReady}
      />
    );

    if (tab === "anamnese") return <PatientAnamneseForm />;
  }, [tab, profile?.id, handlePatientsOpenFormReady]);

  const footer = useMemo(() => {
    if (tab === "form") return <ProfileFormOptions />;

    if (tab === "anamnese") return <PatientAnamneseFormOptions />;
  }, [tab]);

  const drawer = useMemo(() => (
    <CommonDrawer
      isOpen={isFormOpen}
      close={handleClose}
      title={t(`profiles.tabs.${tab}`)}
      header={header}
      footer={footer}
      tabs={tabs}
      activeTab={tab}
      onChangeTab={handleChangeTab}
      showTabs
    >
      {content}
    </CommonDrawer>
  ), [
    isFormOpen,
    handleClose,
    t,
    tab,
    header,
    footer,
    tabs,
    handleChangeTab,
    content,
  ]);

  if (editingRole === "therapist") {
    return (
      <ProfilesListProvider
        module="patients"
        therapistId={profile?.id}
      >
        {drawer}
      </ProfilesListProvider>
    );
  }

  return drawer;
};
