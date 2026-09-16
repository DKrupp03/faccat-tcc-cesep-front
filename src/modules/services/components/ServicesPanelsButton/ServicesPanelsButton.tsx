import { useTranslation } from "react-i18next";
import { IconCalendarEvent, IconList } from "@tabler/icons-react";

import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";

import { useServicesList } from "../../hooks/useServicesList";
import type { ServicesPanelView } from "../../types/service";

export const ServicesPanelsButton = () => {
  const { t } = useTranslation();
  const { panelView, changePanelView } = useServicesList();

  return (
    <CommonGroupButtons
      value={panelView}
      onChange={(value) => changePanelView(value as ServicesPanelView)}
      size="compact"
      fit
    >
      <CommonGroupButtons.Button value="calendar" icon={<IconCalendarEvent size={16} />}>
        {t("services.view.calendar")}
      </CommonGroupButtons.Button>
      <CommonGroupButtons.Button value="list" icon={<IconList size={16} />}>
        {t("services.view.list")}
      </CommonGroupButtons.Button>
    </CommonGroupButtons>
  );
};
