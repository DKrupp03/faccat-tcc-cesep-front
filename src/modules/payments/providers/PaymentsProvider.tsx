import { PaymentsListProvider } from "./PaymentsListProvider";
import { PaymentFormProvider } from "./PaymentFormProvider";
import { usePaymentsList } from "../hooks/usePaymentsList";

type PaymentsProviderProps = {
  therapistId?: number;
  patientId?: number;
  children: React.ReactNode;
};

export const PaymentsProvider = ({ therapistId, patientId, children }: PaymentsProviderProps) => (
  <PaymentsListProvider therapistId={therapistId} patientId={patientId}>
    <PaymentsProviderInner>{children}</PaymentsProviderInner>
  </PaymentsListProvider>
);

const PaymentsProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { paymentFormCallback } = usePaymentsList();

  return (
    <PaymentFormProvider afterSaveCallback={paymentFormCallback}>
      {children}
    </PaymentFormProvider>
  );
};
