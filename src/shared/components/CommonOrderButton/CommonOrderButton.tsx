import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { IconArrowsSort } from "@tabler/icons-react";

import { CommonDropdown } from "../CommonDropdown/CommonDropdown";
import { CommonButton } from "../CommonButton/CommonButton";
import { TOKENS } from "@/shared/theme";

type CommonOrderButton = {
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
  width?: number;
};

export const CommonOrderButton = ({
  value,
  onChange,
  options,
  width = 200,
}: CommonOrderButton) => {
  const { t } = useTranslation();
  
  const buttons = useMemo(() => (
    options.map((option) => ({
      children: option.label,
      icon: option.icon,
      buttonVariant: "noBorder" as const,
      contentAlign: "flex-start" as const,
      onClick: () => {
        onChange(option.value);
      },
      style: option.value === value ? {
        backgroundColor: TOKENS.color.accentSoft,
        color: TOKENS.color.accent,
      } : undefined,
    }))
  ), [options, onChange, value]);

  return (
    <Tooltip title={t("common.actions.order")}>
      <CommonDropdown
        placement="bottomRight"
        options={buttons}
        width={width}
      >
        <CommonButton
          icon={<IconArrowsSort size={18} />}
          iconPlacement="end"
          outline
        />
      </CommonDropdown>
    </Tooltip>
  );
};
