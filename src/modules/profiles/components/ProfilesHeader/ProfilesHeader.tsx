import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconPlus,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";

import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonOrderButton } from "@/shared/components/CommonOrderButton/CommonOrderButton";
import type { ProfilesOrder } from "../../types/profile";

import { useProfiles } from "../../hooks/useProfiles";

export const ProfilesHeader = () => {
  const { t } = useTranslation();
  const {
    module,
    setIsFilterOpen,
    filtratePanel,
    orderBy,
    filter,
  } = useProfiles();

  const profilesOrderOptions = useMemo(() => ([
    {
      value: "name_asc",
      label: t("common.order.nameAsc"),
      icon: <IconSortAscendingLetters size={16} />,
    },
    {
      value: "name_desc",
      label: t("common.order.nameDesc"),
      icon: <IconSortDescendingLetters size={16} />,
    },
  ]), [t]);

  return (
    <CommonHeader
      title={t(`common.modules.${module}`)}
      buttons={[
        <CommonOrderButton
          value={orderBy}
          onChange={(newOrderBy) => filtratePanel(filter, newOrderBy as ProfilesOrder)}
          options={profilesOrderOptions}
        />,
        <Tooltip title={t("common.actions.reload")}>
          <CommonButton
            onClick={() => filtratePanel()}
            icon={<IconReload size={18} />}
            size="large"
            circular
            outline
          />
        </Tooltip>,
        <Tooltip title={t("common.actions.filtrate")}>
          <CommonButton
            onClick={() => setIsFilterOpen(true)}
            icon={<IconFilter size={18} />}
            size="large"
            circular
            outline
          />
        </Tooltip>,
        <Tooltip title={t(`profiles.${module}.actions.create`)}>
          <CommonButton
            onClick={() => {}}
            icon={<IconPlus size={18} />}
            size="large"
            buttonVariant="primary"
            circular
          />
        </Tooltip>,
      ]}
    />
  );
};
