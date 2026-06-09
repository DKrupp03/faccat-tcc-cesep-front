import { createContext } from "react";

import type { Payment } from "../types/payment";

export type PaymentFormContextType = {
  isFormOpen: boolean;
  payment: Payment | undefined;
  isSubmitting: boolean;
  loadingPayment: boolean;
  openForm: (paymentId?: number) => void;
  closeForm: () => void;
  submitPayment: (values: Partial<Payment>) => void;
  deletePayment: (paymentId: number) => void;
};

export const PaymentFormContext = createContext<PaymentFormContextType | null>(null);
