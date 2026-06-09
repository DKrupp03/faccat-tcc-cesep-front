import { useEffect } from "react";

import { usePaymentsList } from "@/modules/payments/hooks/usePaymentsList";
import { PaymentsTable } from "@/modules/payments/components/PaymentsTable/PaymentsTable";
import { PaymentsHeader } from "@/modules/payments/components/PaymentsHeader/PaymentsHeader";

export const PatientPayments = () => {
  const { filtratePanel } = usePaymentsList();

  useEffect(() => {
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PaymentsTable />;
};

export const PatientPaymentsOptions = () => {
  return <PaymentsHeader showCharts={false} />;
};
