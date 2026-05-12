import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";

import { useTherapistsList } from "../../hooks/useTherapistsList";
import { useTherapistForm } from "../../hooks/useTherapistForm";
import type { Therapist } from "../../types/therapist";
import styles from "./TherapistsTable.module.css";

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
        render: (value: string, record: Therapist) => (
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
        title: t("common.columns.patients"),
        dataIndex: "patients_count",
        key: "patients_count",
        width: "15%",
      },
      {
        title: t("common.columns.email"),
        dataIndex: "email",
        key: "email",
        width: "20%",
        render: (_: unknown, record: Therapist) => record.user.email,
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
    <CommonTable<Therapist>
      titleHeader={t("common.modules.therapists")}
      columns={therapistsColumnFields}
      dataSource={therapists}
      pagination
      page={page}
      total={totalFiltered}
      loadMore={(newPage) => filtratePanel(filter, orderBy, newPage)}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};
