import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PaymentsListContext } from "../contexts/PaymentsListContext";
import { PaymentsFilterModal } from "../components/PaymentsFilterModal/PaymentsFilterModal";
import { usePaymentsOperations } from "../hooks/usePaymentsOperations";
import type {
  Payment,
  PaymentsFilter,
  PaymentsOrder,
} from "../types/payment";

type PaymentsListProviderProps = {
  therapistId?: number;
  patientId?: number;
  children: React.ReactNode;
};

export const PaymentsListProvider = ({ therapistId, patientId, children }: PaymentsListProviderProps) => {
  const { t } = useTranslation();
  const { fetchPayments } = usePaymentsOperations();

  const defaultFilter: PaymentsFilter = useMemo(() => ({
    patient_id: patientId,
  }), [patientId]);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [totalReceived, setTotalReceived] = useState<number>(0);
  const [totalToReceive, setTotalToReceive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<PaymentsFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<PaymentsOrder>("expiration_date_desc");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filtratePanel = useCallback(async (
    newFilter: PaymentsFilter = filter,
    newOrderBy: PaymentsOrder = orderBy,
    newPage: number = 1,
  ) => {
    let effectiveFilter = newFilter;
    if (patientId) effectiveFilter = { ...effectiveFilter, patient_id: patientId };

    setFilter(effectiveFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchPayments(effectiveFilter, newOrderBy, newPage);

      if (!response.success) {
        throw new Error(response.error);
      }

      if (newPage === 1) {
        setPayments(response.payments);
        setTotal(response.total);
        setTotalFiltered(response.total_filtered);
        setTotalReceived(Number(response.total_received) || 0);
        setTotalToReceive(Number(response.total_to_receive) || 0);
      } else {
        setPayments((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const incoming = response.payments.filter((p) => !existingIds.has(p.id));
          return [...prev, ...incoming];
        });
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [t, patientId, fetchPayments, filter, orderBy]);

  const paymentFormCallback = useCallback(() => {
    // Os totais e somas dependem do conjunto filtrado calculado no back-end,
    // então recarregamos o painel para mantê-los consistentes.
    filtratePanel(filter, orderBy, 1);
  }, [filtratePanel, filter, orderBy]);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  return (
    <PaymentsListContext.Provider
      value={{
        therapistId,
        patientId,
        payments,
        total,
        totalFiltered,
        totalReceived,
        totalToReceive,
        loading,
        loadingMore,
        filter,
        defaultFilter,
        page,
        orderBy,
        isFilterOpen,
        filtratePanel,
        openFilter,
        closeFilter,
        paymentFormCallback,
      }}
    >
      {children}
      <PaymentsFilterModal />
    </PaymentsListContext.Provider>
  );
};
