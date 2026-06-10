import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  Payment,
  PaymentResponse,
  PaymentsResponse,
  PaymentsPayload,
  PaymentStatusChartResponse,
  PaymentMonthlyChartResponse,
} from "../types/payment";

const paymentToFormData = (payment: Partial<Payment>): FormData => {
  const formData = new FormData();

  Object.entries(payment).forEach(([key, value]) => {
    if (key === "new_attachments" && Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append("payment[attachments][]", file, file.name);
        }
      });
    } else if (key === "remove_attachment_ids" && Array.isArray(value)) {
      value.forEach((id) => {
        formData.append("payment[remove_attachment_ids][]", String(id));
      });
    } else if (key === "attachments" || key === "service" || key === "status") {
      // server-side read DTO, never sent back
      return;
    } else if (value !== undefined && value !== null) {
      formData.append(`payment[${key}]`, String(value));
    }
  });

  return formData;
};

const hasFiles = (payment: Partial<Payment>): boolean => {
  const newFiles = payment.new_attachments;
  return Array.isArray(newFiles) && newFiles.some((f) => f instanceof File);
};

const hasRemovals = (payment: Partial<Payment>): boolean => {
  return Array.isArray(payment.remove_attachment_ids) && payment.remove_attachment_ids.length > 0;
};

const PaymentsService = {
  async getPayment(id: number): Promise<PaymentResponse> {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  async getPayments(params: PaymentsPayload): Promise<PaymentsResponse> {
    const response = await api.get("/payments", { params });
    return response.data;
  },

  async getStatusChart(): Promise<PaymentStatusChartResponse> {
    const response = await api.get("/payments/status_chart");
    return response.data;
  },

  async getMonthlyChart(): Promise<PaymentMonthlyChartResponse> {
    const response = await api.get("/payments/monthly_chart");
    return response.data;
  },

  async createPayment(payment: Partial<Payment>): Promise<PaymentResponse> {
    const useFormData = hasFiles(payment);
    const data = useFormData ? paymentToFormData(payment) : { payment };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.post("/payments", data, { headers });
    return response.data;
  },

  async updatePayment(payment: Partial<Payment>): Promise<PaymentResponse> {
    const useFormData = hasFiles(payment) || hasRemovals(payment);
    const data = useFormData ? paymentToFormData(payment) : { payment };
    const headers = useFormData ? { "Content-Type": undefined } : {};
    const response = await api.put(`/payments/${payment.id}`, data, { headers });
    return response.data;
  },

  async deletePayment(paymentId: number): Promise<CommonResponse> {
    const response = await api.delete(`/payments/${paymentId}`);
    return response.data;
  },
};

export default PaymentsService;
