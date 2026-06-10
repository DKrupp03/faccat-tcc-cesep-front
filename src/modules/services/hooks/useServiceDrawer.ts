import { useCallback, useState } from "react";

import { useServiceForm } from "./useServiceForm";

export type ServiceDrawerTab = "form" | "payment" | "medicalRecord";

export const useServiceDrawer = () => {
  const { isFormOpen, service, closeForm } = useServiceForm();

  const [tab, setTab] = useState<ServiceDrawerTab>("form");

  // Reseta para a aba inicial quando o drawer fecha (sem efeito, para evitar
  // renders em cascata) comparando com o valor anterior de isFormOpen.
  const [wasOpen, setWasOpen] = useState(isFormOpen);
  if (wasOpen !== isFormOpen) {
    setWasOpen(isFormOpen);
    if (!isFormOpen) setTab("form");
  }

  const handleClose = useCallback(() => closeForm(), [closeForm]);

  const handleChangeTab = useCallback((key: string) => setTab(key as ServiceDrawerTab), []);

  return {
    isFormOpen,
    service,
    tab,
    handleClose,
    handleChangeTab,
  };
};
