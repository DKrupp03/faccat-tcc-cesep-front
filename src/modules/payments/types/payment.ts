import type { CommonResponse } from "@/shared/types/common";
import type { Service } from "@/modules/services/types/service";

export type PaymentStatus = "paid" | "overdue" | "unpaid";

export type PaymentMethod =
  | "cash"
  | "pix"
  | "credit_card"
  | "debit_card"
  | "bank_slip"
  | "bank_transfer";

export type Payment = {
  id: number;
  value: string | number;
  expiration_date: string;
  payment_date?: string | null;
  payment_method?: PaymentMethod | null;
  service_id: number;
  status?: PaymentStatus;
  attachment_urls?: string[];
  created_at: string;
  updated_at: string;
  service?: Service;
  // form-only fields (never returned by the API)
  new_attachments?: File[];
};

export type PaymentsOrder =
  | "expiration_date_desc"
  | "expiration_date_asc"
  | "payment_date_desc"
  | "payment_date_asc";

export type PaymentsFilter = {
  status?: PaymentStatus;
  patient_id?: number;
  payment_date_start?: string;
  payment_date_end?: string;
  expiration_date_start?: string;
  expiration_date_end?: string;
};

export type PaymentsPayload = {
  payments: PaymentsFilter;
  order_by: PaymentsOrder;
  page?: number;
  per_page?: number;
};

export type PaymentStatusChartItem = {
  status: PaymentStatus;
  count: number;
};

export type PaymentMonthlyChartItem = {
  month: string;
  received: number;
  received_count: number;
  to_receive: number;
  to_receive_count: number;
};

export type PaymentResponse = CommonResponse & {
  payment: Payment;
};

export type PaymentStatusChartResponse = CommonResponse & {
  status_chart: PaymentStatusChartItem[];
};

export type PaymentMonthlyChartResponse = CommonResponse & {
  monthly_chart: PaymentMonthlyChartItem[];
};

export type PaymentsResponse = CommonResponse & {
  payments: Payment[];
  total: number;
  total_filtered: number;
  total_received: string | number;
  total_to_receive: string | number;
};
