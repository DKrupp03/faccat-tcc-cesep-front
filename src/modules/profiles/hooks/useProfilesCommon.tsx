import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import type { ColumnType } from "antd/es/table";
import { IconDots } from "@tabler/icons-react";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { PaymentStatusBadge } from "@/modules/payments/components/PaymentStatusBadge/PaymentStatusBadge";
import type { PaymentStatus } from "@/modules/payments/types/payment";
import { formatDateTime } from "@/shared/utils/formatters";
import { COLORS } from "@/shared/theme";

import type {
  Profile,
  ProfilesFilter,
  ProfilesPayload,
  ProfilesOrder,
} from "../types/profile";
import ProfilesService from "@/modules/profiles/services/ProfilesService";

export const useProfilesCommon = () => {
  const { t } = useTranslation();

  const createProfile = useCallback(() => {

  }, []);

  const updateProfile = useCallback(() => {

  }, []);

  const deleteProfile = useCallback(() => {

  }, []);

  const fetchProfile = useCallback(async (profileId: number) => {
    return await ProfilesService.getProfile(profileId);
  }, []);

  const fetchProfiles = useCallback(async (
    filter: ProfilesFilter,
    orderBy: ProfilesOrder = "name_asc",
    page?: number,
    perPage?: number,
  ) => {
    const payload: ProfilesPayload = {
      profiles: filter,
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await ProfilesService.getProfiles(payload);
  }, []);

  const getProfilesColumnFields = useCallback((module: ModuleKey): ColumnType<Profile>[] => {
    return [
      {
        title: "",
        dataIndex: "photo_url",
        key: "photo_url",
        render: (value: string, record: Profile) => (
          <CommonAvatar
            size={30}
            name={record.name}
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
    createProfile,
    updateProfile,
    deleteProfile,
    fetchProfile,
    fetchProfiles,
    getProfilesColumnFields,
  };
};
