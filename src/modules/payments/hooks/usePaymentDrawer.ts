import { useCallback, useState } from "react";

import { usePaymentForm } from "./usePaymentForm";

export type PaymentDrawerTab = "form" | "service";

export const usePaymentDrawer = () => {
  const { isFormOpen, payment, closeForm } = usePaymentForm();

  const [tab, setTab] = useState<PaymentDrawerTab>("form");

  // Reseta para a aba inicial quando o drawer fecha (sem efeito, para evitar
  // renders em cascata) comparando com o valor anterior de isFormOpen.
  const [wasOpen, setWasOpen] = useState(isFormOpen);
  if (wasOpen !== isFormOpen) {
    setWasOpen(isFormOpen);
    if (!isFormOpen) setTab("form");
  }

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
