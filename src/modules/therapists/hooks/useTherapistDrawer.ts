import { useCallback, useState } from "react";

import { useTherapistForm } from "./useTherapistForm";

export type TherapistDrawerTab = "form" | "services" | "patients";

export const useTherapistDrawer = () => {
  const { isFormOpen, therapist, closeForm } = useTherapistForm();

  const [tab, setTab] = useState<TherapistDrawerTab>("form");

  // Reseta para a aba inicial quando o drawer fecha (sem efeito, para evitar
  // renders em cascata) comparando com o valor anterior de isFormOpen.
  const [wasOpen, setWasOpen] = useState(isFormOpen);
  if (wasOpen !== isFormOpen) {
    setWasOpen(isFormOpen);
    if (!isFormOpen) setTab("form");
  }

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
