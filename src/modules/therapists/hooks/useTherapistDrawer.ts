import { useCallback, useState, useEffect } from "react";

import { useTherapistForm } from "./useTherapistForm";

export type TherapistDrawerTab = "form" | "services" | "patients";

export const useTherapistDrawer = () => {
  const { isFormOpen, therapist, closeForm } = useTherapistForm();

  const [tab, setTab] = useState<TherapistDrawerTab>("form");

  useEffect(() => {
    if (!isFormOpen) setTab("form");
  }, [isFormOpen]);

  const handleClose = useCallback(() => closeForm(), [closeForm]);

  const handleChangeTab = useCallback((key: string) => setTab(key as TherapistDrawerTab), []);

  return {
    isFormOpen,
    therapist,
    tab,
    handleClose,
    handleChangeTab,
  };
};
