import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  IconEdit,
  IconCalendarEvent,
  IconUsers,
} from "@tabler/icons-react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

import { PatientsProvider } from "@/modules/patients/providers/PatientsProvider";
import { ServicesProvider } from "@/modules/services/providers/ServicesProvider";
import { useTherapistDrawer } from "../../hooks/useTherapistDrawer";
import { TherapistForm, TherapistFormOptions } from "../TherapistForm/TherapistForm";
import { TherapistPatients, TherapistPatientsOptions } from "../TherapistPatients/TherapistPatients";
import { TherapistServices, TherapistServicesOptions } from "../TherapistServices/TherapistServices";

const TherapistDrawerContent = () => {
  const { t } = useTranslation();
  const { isFormOpen, therapist, tab, handleClose, handleChangeTab } = useTherapistDrawer();

  const tabs = useMemo(() => ([
    {
      key: "form",
      name: t("therapists.tabs.form"),
      icon: <IconEdit size={18} />,
    },
    {
      key: "services",
      name: t("therapists.tabs.services"),
      icon: <IconCalendarEvent size={18} />,
      disabled: !therapist?.id,
    },
    {
      key: "patients",
      name: t("therapists.tabs.patients"),
      icon: <IconUsers size={18} />,
      disabled: !therapist?.id,
    },
  ]), [t, therapist?.id]);

  const header = useMemo(() => {
    if (tab === "patients") return <TherapistPatientsOptions />;
    if (tab === "services") return <TherapistServicesOptions />;
  }, [tab]);

  const content = useMemo(() => {
    if (tab === "form") return <TherapistForm />;
    if (tab === "patients") return <TherapistPatients />;
    if (tab === "services") return <TherapistServices />;
  }, [tab]);

  const footer = useMemo(() => {
    if (tab === "form") return <TherapistFormOptions />;
  }, [tab]);

  return (
    <CommonDrawer
      isOpen={isFormOpen}
      close={handleClose}
      title={t(`therapists.tabs.${tab}`)}
      header={header}
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

export const TherapistDrawer = () => {
  const { therapist } = useTherapistDrawer();

  return (
    <PatientsProvider therapistId={therapist?.id}>
      <ServicesProvider therapistId={therapist?.id}>
        <TherapistDrawerContent />
      </ServicesProvider>
    </PatientsProvider>
  );
};
