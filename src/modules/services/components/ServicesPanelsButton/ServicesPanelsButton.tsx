import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { IconCalendarMonth, IconList } from "@tabler/icons-react";

import { CommonDropdown } from "@/shared/components/CommonDropdown/CommonDropdown";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";

import { useServicesList } from "../../hooks/useServicesList";
import type { ServicesPanelView } from "../../types/service";

export const ServicesPanelsButton = () => {
  const { t } = useTranslation();
  const { panelView, changePanelView } = useServicesList();

  const options = useMemo(() => ([
    {
      value: "calendar" as ServicesPanelView,
      label: t("services.view.calendar"),
      icon: <IconCalendarMonth size={16} />,
    },
    {
      value: "list" as ServicesPanelView,
      label: t("services.view.list"),
      icon: <IconList size={16} />,
    },
  ]), [t]);

  const buttons = useMemo(() => (
    options.map((option) => ({
      children: option.label,
      icon: option.icon,
      buttonVariant: "noBorder" as const,
      contentAlign: "flex-start" as const,
      onClick: () => changePanelView(option.value),
      style: option.value === panelView ? {
        border: `1px solid ${COLORS.grey30}`,
        backgroundColor: COLORS.grey10,
        color: COLORS.grey90,
      } : undefined,
    }))
  ), [options, panelView, changePanelView]);

  return (
    <Tooltip title={t("services.view.panel")}>
      <CommonDropdown
        placement="bottomRight"
        options={buttons}
        width={200}
      >
        <CommonButton
          icon={panelView === "calendar"
            ? <IconCalendarMonth size={18} />
            : <IconList size={18} />}
          size="large"
          circular
          outline
        />
      </CommonDropdown>
    </Tooltip>
  );
};
