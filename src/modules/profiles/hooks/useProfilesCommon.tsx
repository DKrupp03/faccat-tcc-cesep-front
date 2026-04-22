import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import type { ColumnType } from "antd/es/table";
import {
  IconDots,
  IconFilter,
  IconStethoscope,
  IconUsers,
  IconTextSpellcheck,
} from "@tabler/icons-react";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { PaymentStatusBadge } from "@/modules/payments/components/PaymentStatusBadge/PaymentStatusBadge";
import type { PaymentStatus } from "@/modules/payments/types/payment";
import { formatDateTime } from "@/shared/utils/formatters";
import { COLORS } from "@/shared/theme";

import type { Profile } from "../types/profile";

export const useProfilesCommon = () => {
  const { t } = useTranslation();

  const getProfilesHeaderCards = useCallback((
    module: ModuleKey,
    total: number,
    totalActive: number,
    totalFiltered: number,
  ) => {
    return [
      {
        text: t(`profiles.${module}.headerCards.total`),
        value: total,
        icon: module === "therapists"
          ? <IconStethoscope size={28} stroke={1.5} color={COLORS.grey70} />
          : <IconUsers size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t(`profiles.${module}.headerCards.actives`),
        value: totalActive,
        icon: <IconTextSpellcheck size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t(`profiles.${module}.headerCards.filtered`),
        value: totalFiltered,
        icon: <IconFilter size={28} stroke={1.5} color={COLORS.grey70} />,
      },
    ];
  }, [t]);

  const getProfilesColumnFields = useCallback((module: ModuleKey): ColumnType<Profile>[] => {
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
          render: (value: PaymentStatus) => <PaymentStatusBadge status={value} />,
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
        render: () => (
          <Flex align="center">
            <IconDots
              color={COLORS.navy}
              size={16}
              cursor="pointer"
            />
          </Flex>
        )
      },
    ];
  }, [t]);

  return {
    getProfilesHeaderCards,
    getProfilesColumnFields,
  };
};
