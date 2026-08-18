import { createContext } from "react";

import type {
  Payment,
  PaymentsFilter,
  PaymentsOrder,
  PaymentStatusChartItem,
  PaymentMonthlyChartItem,
} from "../types/payment";

export type PaymentsListContextType = {
  therapistId?: number;
  patientId?: number;
  payments: Payment[];
  total: number;
  totalFiltered: number;
  totalReceived: number;
  totalToReceive: number;
  loading: boolean;
  loadingMore: boolean;
  filter: PaymentsFilter;
  defaultFilter: PaymentsFilter;
  page: number;
  orderBy: PaymentsOrder;
  isFilterOpen: boolean;
  statusChart: PaymentStatusChartItem[];
  monthlyChart: PaymentMonthlyChartItem[];
  loadingCharts: boolean;
  filtratePanel: (
    newFilter?: PaymentsFilter,
    newOrderBy?: PaymentsOrder,
    newPage?: number,
  ) => Promise<void>;
  openFilter: () => void;
  closeFilter: () => void;
  paymentFormCallback: (operation: "create" | "update" | "delete", payment: Payment) => void;
};

export const PaymentsListContext = createContext<PaymentsListContextType | null>(null);
