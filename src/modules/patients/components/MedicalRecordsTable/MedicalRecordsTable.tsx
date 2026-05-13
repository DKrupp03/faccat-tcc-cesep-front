import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDate } from "@/shared/utils/formatters";

import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import type { MedicalRecordType } from "../../types/medicalRecord";
import styles from "./MedicalRecordsTable.module.css";

export const MedicalRecordsTable = () => {
  const { t } = useTranslation();
  const {
    medicalRecords,
    page,
    totalFiltered,
    loading,
    loadingMore,
    filtratePanel,
    filter,
    orderBy,
    openForm,
  } = useMedicalRecords();

  const columns = useMemo((): ColumnType<MedicalRecordType>[] => ([
    {
      title: t("patients.medicalRecords.columns.title"),
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (value: string, record: MedicalRecordType) => (
        <span
          className={styles.title}
          onClick={() => openForm(record.id)}
        >
          {value}
        </span>
      ),
    },
    {
      title: t("patients.medicalRecords.columns.date"),
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (value?: string) => formatDate(value),
    },
    {
      title: t("patients.medicalRecords.columns.observations"),
      dataIndex: "observations",
      key: "observations",
      width: "50%",
      render: (value?: string) => (
        <span className={styles.observations}>{value}</span>
      ),
    },
  ]), [t, openForm]);

  return (
    <CommonTable<MedicalRecordType>
      titleHeader={t("patients.tabs.medicalRecords")}
      columns={columns}
      dataSource={medicalRecords}
      pagination
      page={page}
      total={totalFiltered}
      loadMore={(newPage) => filtratePanel(filter, orderBy, newPage)}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};
