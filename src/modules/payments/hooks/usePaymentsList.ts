import { useContext } from "react";

import { PaymentsListContext } from "../contexts/PaymentsListContext";

export const usePaymentsList = () => {
  const context = useContext(PaymentsListContext);

  if (!context) {
    throw new Error("usePaymentsList must be used within a PaymentsListProvider");
  }

  return context;
};
