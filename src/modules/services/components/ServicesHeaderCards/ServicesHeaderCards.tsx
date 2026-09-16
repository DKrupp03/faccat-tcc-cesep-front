import { useMemo } from "react";
import { useTranslation } from "react-i18next";

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
      },
      {
        text: t("services.headerCards.filtered"),
        value: totalFiltered,
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
