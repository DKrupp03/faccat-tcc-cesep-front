import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";

import { useTherapistsList } from "../../hooks/useTherapistsList";

export const TherapistsHeaderCards = () => {
  const { t } = useTranslation();
  const {
    loading,
    total,
    totalActive,
    totalFiltered,
  } = useTherapistsList();

  const therapistsHeaderCards = useMemo(() => {
    return [
      {
        text: t("therapists.headerCards.total"),
        value: total,
      },
      {
        text: t("therapists.headerCards.actives"),
        value: totalActive,
      },
      {
        text: t("therapists.headerCards.filtered"),
        value: totalFiltered,
      },
    ];
  }, [t, total, totalActive, totalFiltered]);

  return (
    <CommonHeaderCards
      loading={loading}
      cards={therapistsHeaderCards}
    />
  );
};
