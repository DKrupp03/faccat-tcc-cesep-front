import { useCallback, useState, useEffect } from "react";

import { usePatientForm } from "./usePatientForm";

export type PatientDrawerTab = "form" | "anamnese" | "medicalRecords" | "services" | "payments";

export const usePatientDrawer = () => {
  const { isFormOpen, patient, closeForm } = usePatientForm();

  const [tab, setTab] = useState<PatientDrawerTab>("form");

  useEffect(() => {
    if (!isFormOpen) setTab("form");
  }, [isFormOpen]);

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
