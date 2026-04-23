import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconPlus,
} from "@tabler/icons-react";

import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonOrderButton } from "@/shared/components/CommonOrderButton/CommonOrderButton";
import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import type { ProfilesOrder } from "../../types/profile";

import { useProfilesCommon } from "../../hooks/useProfilesCommon";

type ProfilesHeaderProps = {
  module: ModuleKey;
  openFilter: () => void;
  reload: () => void;
  orderBy: ProfilesOrder;
  onChangeOrderBy: (newOrderBy: ProfilesOrder) => void;
};

export const ProfilesHeader = ({
  module,
  openFilter,
  reload,
  orderBy,
  onChangeOrderBy,
}: ProfilesHeaderProps) => {
  const { t } = useTranslation();
  const { profilesOrderOptions } = useProfilesCommon({ module });

  return (
    <CommonHeader
      title={t(`common.modules.${module}`)}
      buttons={[
        <CommonOrderButton
          value={orderBy}
          onChange={(newOrderBy) => onChangeOrderBy(newOrderBy as ProfilesOrder)}
          options={profilesOrderOptions}
        />,
        <Tooltip title={t("common.actions.reload")}>
          <CommonButton
            onClick={reload}
            icon={<IconReload size={18} />}
            size="large"
            circular
            outline
          />
        </Tooltip>,
        <Tooltip title={t("common.actions.filtrate")}>
          <CommonButton
            onClick={openFilter}
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
