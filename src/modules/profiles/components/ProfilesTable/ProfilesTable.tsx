import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "antd/lib/table/interface";

import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";
import { PaymentStatusBadge } from "@/modules/payments/components/PaymentStatusBadge/PaymentStatusBadge";
import type { PaymentStatus } from "@/modules/payments/types/payment";

import { useProfilesList } from "../../hooks/useProfilesList";
import { useProfilesForm } from "../../hooks/useProfilesForm";
import type { Profile } from "../../types/profile";
import styles from "./ProfilesTable.module.css";

export const ProfilesTable = () => {
  const { t } = useTranslation();
  const {
    module,
    profiles,
    page,
    totalFiltered,
    loading,
    loadingMore,
    filtratePanel,
    filter,
    orderBy,
  } = useProfilesList();
  const { openForm } = useProfilesForm();

  const profilesColumnFields = useMemo((): ColumnType<Profile>[] => {
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
        render: (value: string, record: Profile) => (
          <span
            className={styles.name}
            onClick={() => openForm(record.role, record.id)}
          >
            {value}
          </span>
        ),
      },
      ...(module === "patients"
        ? [
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
          render: (value: Profile) => value?.name,
        },
        {
          title: t("common.columns.paymentStatus"),
          dataIndex: "payment_status",
          key: "payment_status",
          width: "20%",
          render: (value?: PaymentStatus) => <PaymentStatusBadge status={value} />,
        },
      ] : [
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
          render: (_: unknown, record: Profile) => record.user.email,
        },
      ]),
      {
        title: t("common.columns.lastService"),
        dataIndex: "last_service",
        key: "last_service",
        width: "20%",
        render: (value?: string) => formatDateTime(value),
      },
    ];
  }, [t, module, openForm]);

  return (
    <CommonTable<Profile>
      titleHeader={t(`common.modules.${module}`)}
      columns={profilesColumnFields}
      dataSource={profiles}
      pagination
      page={page}
      total={totalFiltered}
      loadMore={(newPage) => filtratePanel(filter, orderBy, newPage)}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};
