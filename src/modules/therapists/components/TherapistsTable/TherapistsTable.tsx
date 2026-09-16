import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";
import { TOKENS } from "@/shared/theme";

import { useTherapistsList } from "../../hooks/useTherapistsList";
import { useTherapistForm } from "../../hooks/useTherapistForm";
import type { Therapist } from "../../types/therapist";
import styles from "./TherapistsTable.module.css";

const ORDER_LABELS: Record<string, string> = {
  name_asc: "common.order.nameAsc",
  name_desc: "common.order.nameDesc",
};

export const TherapistsTable = () => {
  const { t } = useTranslation();
  const {
    therapists,
    page,
    totalFiltered,
    loading,
    loadingMore,
    filtratePanel,
    filter,
    orderBy,
  } = useTherapistsList();
  const { openForm } = useTherapistForm();

  const therapistsColumnFields = useMemo((): ColumnType<Therapist>[] => {
    return [
      {
        title: t("therapists.columns.name"),
        dataIndex: "name",
        key: "name",
        width: "28%",
        render: (value: string, record: Therapist) => (
          <Flex align="center" gap={TOKENS.space[12]}>
            <CommonAvatar size={32} name={value} photoUrl={record.photo_url} />
            <span
              className={styles.name}
              onClick={() => openForm(record.id)}
            >
              {value}
            </span>
            {record.admin && (
              <span className={styles.adminTag}>{t("therapists.adminTag")}</span>
            )}
          </Flex>
        ),
      },
      {
        title: t("therapists.columns.services"),
        dataIndex: "services_count",
        key: "services_count",
        width: "13%",
        align: "right",
        className: styles.number,
      },
      {
        title: t("therapists.columns.patients"),
        dataIndex: "patients_count",
        key: "patients_count",
        width: "11%",
        align: "right",
        className: styles.number,
      },
      {
        title: t("therapists.columns.email"),
        dataIndex: "email",
        key: "email",
        width: "26%",
        ellipsis: true,
        className: styles.email,
      },
      {
        title: t("therapists.columns.lastService"),
        dataIndex: "last_service",
        key: "last_service",
        width: "22%",
        align: "right",
        className: styles.date,
        render: (value?: string) => formatDateTime(value),
      },
    ];
  }, [t, openForm]);

  return (
    <CommonTable<Therapist>
      titleHeader={t("therapists.listTitle")}
      header={ORDER_LABELS[orderBy] && (
        <span className={styles.orderNote}>{t(ORDER_LABELS[orderBy])}</span>
      )}
      columns={therapistsColumnFields}
      dataSource={therapists}
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
