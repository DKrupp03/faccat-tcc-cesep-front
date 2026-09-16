import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateAndTime } from "@/shared/utils/formatters";

import { useServicesList } from "../../hooks/useServicesList";
import { useServiceForm } from "../../hooks/useServiceForm";
import { ServiceStatusBadge } from "../ServiceStatusBadge/ServiceStatusBadge";
import { getServiceTypeLabel } from "../../utils/form";
import type { Service } from "../../types/service";
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
        width: "21%",
        ellipsis: true,
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
        width: "19%",
        ellipsis: true,
        render: (_: unknown, record: Service) => record.therapist?.name,
      },
      {
        title: t("services.columns.serviceType"),
        dataIndex: "service_type",
        key: "service_type",
        width: "22%",
        ellipsis: true,
        className: styles.secondary,
        render: (_: unknown, record: Service) => getServiceTypeLabel(t, record.service_type),
      },
      {
        title: t("services.columns.room"),
        dataIndex: "room",
        key: "room",
        width: "10%",
        ellipsis: true,
        className: styles.secondary,
        render: (_: unknown, record: Service) => record.room?.name,
      },
      {
        title: t("services.columns.date"),
        dataIndex: "date",
        key: "date",
        width: "15%",
        align: "right",
        className: styles.date,
        render: (_: unknown, record: Service) => formatDateAndTime(record.date, record.start_time),
      },
      {
        title: t("services.columns.status"),
        dataIndex: "status",
        key: "status",
        width: "14%",
        className: styles.status,
        render: (_: unknown, record: Service) => (
          <ServiceStatusBadge status={record.status} />
        ),
      },
    ];
  }, [t, openForm]);

  return (
    <CommonTable<Service>
      titleHeader={t("common.modules.services")}
      headerNote={t(orderBy === "date_asc" ? "services.order.dateAsc" : "services.order.dateDesc")}
      columns={servicesColumnFields}
      dataSource={services}
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
