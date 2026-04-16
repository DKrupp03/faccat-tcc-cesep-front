import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { IconReload } from "@tabler/icons-react";

import { CommonButton } from "../CommonButton/CommonButton";

type CommonReloadButtonProps = {
  onClick: () => void;
};

export const CommonReloadButton = ({
  onClick,
}: CommonReloadButtonProps) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("common.actions.reload")}>
      <CommonButton
        onClick={onClick}
        icon={<IconReload size={16} />}
        size="large"
        outline
      />
    </Tooltip>
  );
};
