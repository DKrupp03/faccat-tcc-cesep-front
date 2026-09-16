import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDate, formatCurrency } from "@/shared/utils/formatters";

import { usePaymentsList } from "../../hooks/usePaymentsList";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import { PaymentStatusBadge } from "../PaymentStatusBadge/PaymentStatusBadge";
import type { Payment, PaymentMethod } from "../../types/payment";
import styles from "./PaymentsTable.module.css";

const ORDER_LABELS: Record<string, string> = {
  expiration_date_desc: "payments.order.expirationDesc",
  expiration_date_asc: "payments.order.expirationAsc",
  payment_date_desc: "payments.order.paymentDesc",
  payment_date_asc: "payments.order.paymentAsc",
};

export const PaymentsTable = () => {
  const { t } = useTranslation();
  const {
    payments,
    page,
    totalFiltered,
    loading,
    loadingMore,
    filtratePanel,
    filter,
    orderBy,
  } = usePaymentsList();
  const { openForm } = usePaymentForm();

  const paymentsColumnFields = useMemo((): ColumnType<Payment>[] => {
    return [
      {
        title: t("payments.columns.patient"),
        dataIndex: "patient",
        key: "patient",
        width: "24%",
        ellipsis: true,
        render: (_: unknown, record: Payment) => (
          <span
            className={styles.name}
            onClick={() => openForm(record.id)}
          >
            {record.service?.patient?.name}
          </span>
        ),
      },
      {
        title: t("payments.columns.value"),
        dataIndex: "value",
        key: "value",
        width: "14%",
        align: "right",
        className: styles.value,
        // Gratuito não tem valor: vazio em vez de "R$ 0,00".
        render: (value: string | number | null, record: Payment) => (
          record.free ? "" : formatCurrency(value ?? undefined)
        ),
      },
      {
        title: t("payments.columns.expirationDate"),
        dataIndex: "expiration_date",
        key: "expiration_date",
        width: "14%",
        align: "right",
        className: styles.date,
        render: (value: string) => formatDate(value),
      },
      {
        title: t("payments.columns.paymentDate"),
        dataIndex: "payment_date",
        key: "payment_date",
        width: "15%",
        align: "right",
        className: `${styles.date} ${styles.secondary}`,
        render: (value?: string) => formatDate(value),
      },
      {
        title: t("payments.columns.paymentMethod"),
        dataIndex: "payment_method",
        key: "payment_method",
        width: "17%",
        className: styles.method,
        render: (value?: PaymentMethod) => (
          value ? t(`payments.paymentMethods.${value}`) : ""
        ),
      },
      {
        title: t("payments.columns.status"),
        dataIndex: "status",
        key: "status",
        width: "16%",
        render: (_: unknown, record: Payment) => (
          <PaymentStatusBadge status={record.status} />
        ),
      },
    ];
  }, [t, openForm]);

  return (
    <CommonTable<Payment>
      titleHeader={t("common.modules.payments")}
      header={<span className={styles.orderNote}>{t(ORDER_LABELS[orderBy])}</span>}
      columns={paymentsColumnFields}
      dataSource={payments}
      rowKey="id"
      pagination
      page={page}
      total={totalFiltered}
      loadMore={(newPage) => filtratePanel(filter, orderBy, newPage)}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};
