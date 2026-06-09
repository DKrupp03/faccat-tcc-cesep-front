import { useCallback } from "react";

import type {
  Payment,
  PaymentsFilter,
  PaymentsOrder,
  PaymentsPayload,
} from "../types/payment";
import PaymentsService from "../services/PaymentsService";

export const usePaymentsOperations = () => {
  const createPayment = useCallback(async (payment: Partial<Payment>) => {
    return await PaymentsService.createPayment(payment);
  }, []);

  const updatePayment = useCallback(async (payment: Partial<Payment>) => {
    return await PaymentsService.updatePayment(payment);
  }, []);

  const deletePayment = useCallback(async (paymentId: number) => {
    return await PaymentsService.deletePayment(paymentId);
  }, []);

  const fetchPayment = useCallback(async (paymentId: number) => {
    return await PaymentsService.getPayment(paymentId);
  }, []);

  const fetchPayments = useCallback(async (
    filter: PaymentsFilter,
    orderBy: PaymentsOrder = "expiration_date_desc",
    page?: number,
    perPage?: number,
  ) => {
    const payload: PaymentsPayload = {
      payments: filter,
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await PaymentsService.getPayments(payload);
  }, []);

  return {
    createPayment,
    updatePayment,
    deletePayment,
    fetchPayment,
    fetchPayments,
  };
};
