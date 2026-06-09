import { useContext } from "react";

import { PaymentFormContext } from "../contexts/PaymentFormContext";

export const usePaymentForm = () => {
  const context = useContext(PaymentFormContext);

  if (!context) {
    throw new Error("usePaymentForm must be used within a PaymentFormProvider");
  }

  return context;
};
