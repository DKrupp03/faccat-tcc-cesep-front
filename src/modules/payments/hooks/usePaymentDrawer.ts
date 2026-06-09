import { useCallback, useState, useEffect } from "react";

import { usePaymentForm } from "./usePaymentForm";

export type PaymentDrawerTab = "form" | "service";

export const usePaymentDrawer = () => {
  const { isFormOpen, payment, closeForm } = usePaymentForm();

  const [tab, setTab] = useState<PaymentDrawerTab>("form");

  useEffect(() => {
    if (!isFormOpen) setTab("form");
  }, [isFormOpen]);

  const handleClose = useCallback(() => closeForm(), [closeForm]);

  const handleChangeTab = useCallback((key: string) => setTab(key as PaymentDrawerTab), []);

  return {
    isFormOpen,
    payment,
    tab,
    handleClose,
    handleChangeTab,
  };
};
