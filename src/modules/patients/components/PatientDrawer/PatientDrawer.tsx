import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconEdit,
  IconReportAnalytics,
  IconActivity,
  IconCalendarEvent,
  IconReportMoney,
} from "@tabler/icons-react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

import { usePatientDrawer } from "../../hooks/usePatientDrawer";
import { PatientForm, PatientFormOptions } from "../PatientForm/PatientForm";
import { PatientAnamneseForm, PatientAnamneseFormOptions } from "../PatientAnamneseForm/PatientAnamneseForm";

export const PatientDrawer = () => {
  const { t } = useTranslation();
  const { isFormOpen, patient, tab, handleClose, handleChangeTab } = usePatientDrawer();

  const tabs = useMemo(() => ([
    {
      key: "form",
      name: t("patients.tabs.form"),
      icon: <IconEdit size={18} />,
    },
    {
      key: "anamnese",
      name: t("patients.tabs.anamnese"),
      icon: <IconReportAnalytics size={18} />,
      disabled: !patient?.id,
    },
    {
      key: "medicalRecords",
      name: t("patients.tabs.medicalRecords"),
      icon: <IconActivity size={18} />,
      disabled: !patient?.id,
    },
    {
      key: "services",
      name: t("patients.tabs.services"),
      icon: <IconCalendarEvent size={18} />,
      disabled: !patient?.id,
    },
    {
      key: "payments",
      name: t("patients.tabs.payments"),
      icon: <IconReportMoney size={18} />,
      disabled: !patient?.id,
    },
  ]), [t, patient?.id]);

  const content = useMemo(() => {
    if (tab === "form") return <PatientForm />;
    if (tab === "anamnese") return <PatientAnamneseForm />;
  }, [tab]);

  const footer = useMemo(() => {
    if (tab === "form") return <PatientFormOptions />;
    if (tab === "anamnese") return <PatientAnamneseFormOptions />;
  }, [tab]);

  return (
    <CommonDrawer
      isOpen={isFormOpen}
      close={handleClose}
      title={t(`patients.tabs.${tab}`)}
      footer={footer}
      tabs={tabs}
      activeTab={tab}
      onChangeTab={handleChangeTab}
      showTabs
    >
      {content}
    </CommonDrawer>
  );
};
