import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconCalendarEvent, IconFilter } from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";

import { useServicesList } from "../../hooks/useServicesList";

export const ServicesHeaderCards = () => {
  const { t } = useTranslation();
  const { loading, total, totalFiltered } = useServicesList();

  const servicesHeaderCards = useMemo(() => {
    return [
      {
        text: t("services.headerCards.total"),
        value: total,
        icon: <IconCalendarEvent size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("services.headerCards.filtered"),
        value: totalFiltered,
        icon: <IconFilter size={28} stroke={1.5} color={COLORS.grey70} />,
      },
    ];
  }, [t, total, totalFiltered]);

  return (
    <CommonHeaderCards
      loading={loading}
      cards={servicesHeaderCards}
    />
  );
};
