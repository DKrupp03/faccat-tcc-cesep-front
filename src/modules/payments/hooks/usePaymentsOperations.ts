import { useCallback } from "react";

import type {
  Payment,
  PaymentsFilter,
  PaymentsOrder,
  PaymentsPayload,
} from "../types/payment";
import PaymentsService from "../services/PaymentsService";
import { buildPaymentsFilterPayload } from "../utils/filter";

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
      ...buildPaymentsFilterPayload(filter),
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await PaymentsService.getPayments(payload);
  }, []);

  // Os gráficos não são paginados: usam o mesmo filtro da listagem sobre o
  // conjunto inteiro.
  const fetchPaymentsCharts = useCallback(async (filter: PaymentsFilter) => {
    const payload = buildPaymentsFilterPayload(filter);

    const [statusResponse, monthlyResponse] = await Promise.all([
      PaymentsService.getStatusChart(payload),
      PaymentsService.getMonthlyChart(payload),
    ]);

    return { statusResponse, monthlyResponse };
  }, []);

  return {
    createPayment,
    updatePayment,
    deletePayment,
    fetchPayment,
    fetchPayments,
    fetchPaymentsCharts,
  };
};
