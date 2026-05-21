import { useCallback, useState, useEffect } from "react";

import { useServiceForm } from "./useServiceForm";

export type ServiceDrawerTab = "form" | "payment" | "medicalRecord";

export const useServiceDrawer = () => {
  const { isFormOpen, service, closeForm } = useServiceForm();

  const [tab, setTab] = useState<ServiceDrawerTab>("form");

  useEffect(() => {
    if (!isFormOpen) setTab("form");
  }, [isFormOpen]);

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
