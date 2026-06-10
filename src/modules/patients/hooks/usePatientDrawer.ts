import { useCallback, useState } from "react";

import { usePatientForm } from "./usePatientForm";

export type PatientDrawerTab = "form" | "anamnese" | "medicalRecords" | "services" | "payments";

export const usePatientDrawer = () => {
  const { isFormOpen, patient, closeForm } = usePatientForm();

  const [tab, setTab] = useState<PatientDrawerTab>("form");

  // Reseta para a aba inicial quando o drawer fecha (sem efeito, para evitar
  // renders em cascata) comparando com o valor anterior de isFormOpen.
  const [wasOpen, setWasOpen] = useState(isFormOpen);
  if (wasOpen !== isFormOpen) {
    setWasOpen(isFormOpen);
    if (!isFormOpen) setTab("form");
  }

  const handleClose = useCallback(() => closeForm(), [closeForm]);

  const handleChangeTab = useCallback((key: string) => setTab(key as PatientDrawerTab), []);

  return {
    isFormOpen,
    patient,
    tab,
    handleClose,
    handleChangeTab,
  };
};
