import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";
import { TOKENS } from "@/shared/theme";
import { PaymentStatusBadge } from "@/modules/payments/components/PaymentStatusBadge/PaymentStatusBadge";
import type { PaymentStatus } from "@/modules/payments/types/payment";
import type { Therapist } from "@/modules/therapists/types/therapist";

import { usePatientsList } from "../../hooks/usePatientsList";
import { usePatientForm } from "../../hooks/usePatientForm";
import type { Patient } from "../../types/patient";
import styles from "./PatientsTable.module.css";

const ORDER_LABELS: Record<string, string> = {
  name_asc: "common.order.nameAsc",
  name_desc: "common.order.nameDesc",
};

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
        title: t("patients.columns.name"),
        dataIndex: "name",
        key: "name",
        width: "32%",
        render: (value: string, record: Patient) => (
          <Flex align="center" gap={TOKENS.space[12]}>
            <CommonAvatar
              size={32}
              name={value}
              photoUrl={record.photo_url}
            />
            <span
              className={styles.name}
              onClick={() => openForm(record.id)}
            >
              {value}
            </span>
          </Flex>
        ),
      },
      {
        title: t("patients.columns.services"),
        dataIndex: "services_count",
        key: "services_count",
        width: "12%",
        align: "right",
        className: styles.number,
      },
      {
        title: t("patients.columns.therapist"),
        dataIndex: "therapist",
        key: "therapist",
        width: "20%",
        className: styles.therapist,
        render: (value: Therapist) => value?.name,
      },
      {
        title: t("patients.columns.paymentStatus"),
        dataIndex: "payment_status",
        key: "payment_status",
        width: "18%",
        render: (value?: PaymentStatus) => <PaymentStatusBadge status={value} />,
      },
      {
        title: t("patients.columns.lastService"),
        dataIndex: "last_service",
        key: "last_service",
        width: "18%",
        align: "right",
        className: styles.date,
        render: (value?: string) => formatDateTime(value),
      },
    ];
  }, [t, openForm]);

  return (
    <CommonTable<Patient>
      titleHeader={t("patients.listTitle")}
      headerNote={ORDER_LABELS[orderBy] && t(ORDER_LABELS[orderBy])}
      columns={patientsColumnFields}
      dataSource={patients}
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
