import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";
import { PaymentStatusBadge } from "@/modules/payments/components/PaymentStatusBadge/PaymentStatusBadge";
import type { PaymentStatus } from "@/modules/payments/types/payment";
import type { Therapist } from "@/modules/therapists/types/therapist";

import { usePatientsList } from "../../hooks/usePatientsList";
import { usePatientForm } from "../../hooks/usePatientForm";
import type { Patient } from "../../types/patient";
import styles from "./PatientsTable.module.css";

export const PatientsTable = () => {
  const { t } = useTranslation();
  const {
    patients,
    page,
    totalFiltered,
    loading,
    loadingMore,
    filtratePanel,
    filter,
    orderBy,
  } = usePatientsList();
  const { openForm } = usePatientForm();

  const patientsColumnFields = useMemo((): ColumnType<Patient>[] => {
    return [
      {
        title: "",
        dataIndex: "photo_url",
        key: "photo_url",
        render: (value: string) => (
          <CommonAvatar
            size={30}
            photoUrl={value}
          />
        ),
      },
      {
        title: t("common.columns.name"),
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: (value: string, record: Patient) => (
          <span
            className={styles.name}
            onClick={() => openForm(record.id)}
          >
            {value}
          </span>
        ),
      },
      {
        title: t("common.columns.services"),
        dataIndex: "services_count",
        key: "services_count",
        width: "15%",
      },
      {
        title: t("common.columns.therapist"),
        dataIndex: "therapist",
        key: "therapist",
        width: "15%",
        render: (value: Therapist) => value?.name,
      },
      {
        title: t("common.columns.paymentStatus"),
        dataIndex: "payment_status",
        key: "payment_status",
        width: "20%",
        render: (value?: PaymentStatus) => <PaymentStatusBadge status={value} />,
      },
      {
        title: t("common.columns.lastService"),
        dataIndex: "last_service",
        key: "last_service",
        width: "20%",
        render: (value?: string) => formatDateTime(value),
      },
    ];
  }, [t, openForm]);

  return (
    <CommonTable<Patient>
      titleHeader={t("common.modules.patients")}
      columns={patientsColumnFields}
      dataSource={patients}
      pagination
      page={page}
      total={totalFiltered}
      loadMore={(newPage) => filtratePanel(filter, orderBy, newPage)}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};
