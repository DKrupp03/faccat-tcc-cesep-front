import type { TFunction } from "i18next";

import type { PaymentMethod, PaymentStatus } from "../types/payment";

const PAYMENT_METHODS: PaymentMethod[] = [
  "cash",
  "pix",
  "credit_card",
  "debit_card",
  "bank_slip",
  "bank_transfer",
];

const PAYMENT_STATUSES: PaymentStatus[] = ["paid", "unpaid", "overdue"];

export const getPaymentMethodOptions = (t: TFunction) =>
  PAYMENT_METHODS.map((method) => ({
    value: method,
    label: t(`payments.paymentMethods.${method}`),
  }));

export const getStatusOptions = (t: TFunction) =>
  PAYMENT_STATUSES.map((status) => ({
    value: status,
    label: t(`payments.status.${status}`),
  }));

// "1.234,56" (máscara pt-BR) -> "1234.56" (decimal aceito pelo back-end)
export const parseCurrencyInput = (value?: string): string | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  return String(value).replace(/\./g, "").replace(",", ".");
};

// "150.0" (decimal do back-end) -> "150,00" (máscara pt-BR)
export const formatCurrencyInput = (value?: string | number): string => {
  if (value === undefined || value === null || value === "") return "";
  const number = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(number)) return "";
  const cents = Math.round(number * 100);
  const intPart = Math.floor(cents / 100);
  const decPart = Math.abs(cents % 100);
  return `${intPart},${String(decPart).padStart(2, "0")}`;
};
