import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import type { ColumnType } from "antd/lib/table/interface";
import { IconDots, IconPencil, IconPower, IconTrash } from "@tabler/icons-react";

import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonDropdown } from "@/shared/components/CommonDropdown/CommonDropdown";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { formatDateTime } from "@/shared/utils/formatters";
import { PaymentStatusBadge } from "@/modules/payments/components/PaymentStatusBadge/PaymentStatusBadge";
import type { PaymentStatus } from "@/modules/payments/types/payment";

import { useProfiles } from "../../hooks/useProfiles";
import type { Profile } from "../../types/profile";

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
  } = useProfiles();

  const getProfilesDropdownOptions = useCallback((active: boolean) => ([
    {
      onClick: () => {},
      icon: <IconPencil size={16} />,
      buttonVariant: "noBorder" as const,
      children: t("common.actions.edit"),
      contentAlign: "flex-start" as const,
    },
    ...(active ? [{
      onClick: () => {},
      icon: <IconPower size={16} />,
      buttonVariant: "noBorder" as const,
      children: t("common.actions.inactivate"),
      contentAlign: "flex-start" as const,
    }] : []),
    {
      onClick: () => {},
      icon: <IconTrash size={16} />,
      buttonVariant: "noBorder" as const,
      children: t("common.actions.delete"),
      contentAlign: "flex-start" as const,
    },
  ]), [t]);

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
        title: t("profiles.columns.name"),
        dataIndex: "name",
        key: "name",
        width: "30%",
      },
      ...(module === "patients"
        ? [
        {
          title: t("profiles.columns.services"),
          dataIndex: "services_count",
          key: "services_count",
          width: "15%",
        },
        {
          title: t("profiles.columns.therapist"),
          dataIndex: "therapist",
          key: "therapist",
          width: "15%",
          render: (value: Profile) => value?.name,
        },
        {
          title: t("profiles.columns.paymentStatus"),
          dataIndex: "payment_status",
          key: "payment_status",
          width: "20%",
          render: (value?: PaymentStatus) => <PaymentStatusBadge status={value} />,
        },
      ] : [
        {
          title: t("profiles.columns.services"),
          dataIndex: "services_count",
          key: "services_count",
          width: "15%",
        },
        {
          title: t("profiles.columns.patients"),
          dataIndex: "patients_count",
          key: "patients_count",
          width: "15%",
        },
        {
          title: t("profiles.columns.email"),
          dataIndex: "email",
          key: "email",
          width: "20%",
          render: (_: unknown, record: Profile) => record.user.email,
        },
      ]),
      {
        title: t("profiles.columns.lastService"),
        dataIndex: "last_service",
        key: "last_service",
        width: "20%",
        render: (value?: string) => formatDateTime(value),
      },
      {
        title: "",
        dataIndex: "options",
        key: "options",
        render: (_: unknown, record: Profile) => (
          <Flex align="center">
            <CommonDropdown
              options={getProfilesDropdownOptions(record.active)}
              placement="bottomRight"
            >
              <IconDots size={16} cursor="pointer" />
            </CommonDropdown>
          </Flex>
        )
      },
    ];
  }, [t, module, getProfilesDropdownOptions]);

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
