import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { IconArrowsSort } from "@tabler/icons-react";

import { CommonDropdown } from "../CommonDropdown/CommonDropdown";
import { CommonButton } from "../CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";

type CommonOrderButton = {
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
};

export const CommonOrderButton = ({
  value,
  onChange,
  options,
}: CommonOrderButton) => {
  const { t } = useTranslation();
  
  const [open, setOpen] = useState<boolean>(false);

  const buttons = useMemo(() => (
    options.map((option) => ({
      children: option.label,
      icon: option.icon,
      buttonVariant: "noBorder" as const,
      contentAlign: "flex-start" as const,
      onClick: () => {
        onChange(option.value);
        setOpen(false);
      },
      style: option.value === value ? {
        border: `1px solid ${COLORS.grey70}`,
        backgroundColor: COLORS.grey10,
        color: COLORS.grey90,
      } : undefined,
    }))
  ), [options, value]);

  return (
    <Tooltip title={t("common.actions.order")}>
      <CommonDropdown
        placement="bottomRight"
        options={buttons}
        open={open}
        onOpenChange={setOpen}
      >
        <CommonButton
          icon={<IconArrowsSort size={18} />}
          iconPlacement="end"
          size="large"
          circular
          outline
        />
      </CommonDropdown>
    </Tooltip>
  );
};
