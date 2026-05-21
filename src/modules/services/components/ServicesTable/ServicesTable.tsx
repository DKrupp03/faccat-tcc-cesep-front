import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";

import { useServicesList } from "../../hooks/useServicesList";
import { useServiceForm } from "../../hooks/useServiceForm";
import { ServiceStatusBadge } from "../ServiceStatusBadge/ServiceStatusBadge";
import type { Service, ServiceType } from "../../types/service";
import styles from "./ServicesTable.module.css";

export const ServicesTable = () => {
  const { t } = useTranslation();
  const {
    services,
    page,
    totalFiltered,
    loading,
    loadingMore,
    filtratePanel,
    filter,
    orderBy,
  } = useServicesList();
  const { openForm } = useServiceForm();

  const servicesColumnFields = useMemo((): ColumnType<Service>[] => {
    return [
      {
        title: t("services.columns.patient"),
        dataIndex: "patient",
        key: "patient",
        width: "22%",
        render: (_: unknown, record: Service) => (
          <span
            className={styles.name}
            onClick={() => openForm(record.id)}
          >
            {record.patient?.name}
          </span>
        ),
      },
      {
        title: t("services.columns.therapist"),
        dataIndex: "therapist",
        key: "therapist",
        width: "22%",
        render: (_: unknown, record: Service) => record.therapist?.name,
      },
      {
        title: t("services.columns.serviceType"),
        dataIndex: "service_type",
        key: "service_type",
        width: "26%",
        render: (value: ServiceType) => t(`services.serviceTypes.${value}`),
      },
      {
        title: t("services.columns.datetimeStart"),
        dataIndex: "datetime_start",
        key: "datetime_start",
        width: "18%",
        render: (value: string) => formatDateTime(value),
      },
      {
        title: t("services.columns.status"),
        dataIndex: "status",
        key: "status",
        width: "12%",
        render: (_: unknown, record: Service) => (
          <ServiceStatusBadge status={record.status} />
        ),
      },
    ];
  }, [t, openForm]);

  return (
    <CommonTable<Service>
      titleHeader={t("common.modules.services")}
      columns={servicesColumnFields}
      dataSource={services}
      pagination
      page={page}
      total={totalFiltered}
      loadMore={(newPage) => filtratePanel(filter, orderBy, newPage)}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};
