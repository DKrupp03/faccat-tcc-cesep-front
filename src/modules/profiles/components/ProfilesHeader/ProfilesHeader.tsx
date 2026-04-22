import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { IconFilter, IconReload, IconPlus } from "@tabler/icons-react";

import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import type { ModuleKey } from "@/shared/contexts/ModulesContext";

type ProfilesHeaderProps = {
  module: ModuleKey;
};

export const ProfilesHeader = ({
  module,
}: ProfilesHeaderProps) => {
  const { t } = useTranslation();

  return (
    <CommonHeader
      title={t(`common.modules.${module}`)}
      buttons={[
        <Tooltip title={t("common.actions.reload")}>
          <CommonButton
            onClick={() => {}}
            icon={<IconReload size={18} />}
            size="large"
            outline
          />
        </Tooltip>,
        <Tooltip title={t("common.actions.filtrate")}>
          <CommonButton
            onClick={() => {}}
            icon={<IconFilter size={18} />}
            size="large"
            outline
          />
        </Tooltip>,
        <Tooltip title={t(`profiles.${module}.actions.create`)}>
          <CommonButton
            onClick={() => {}}
            icon={<IconPlus size={18} />}
            size="large"
            buttonVariant="primary"
          />
        </Tooltip>,
      ]}
    />
  );
};
