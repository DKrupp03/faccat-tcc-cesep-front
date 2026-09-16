import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";

import { usePatientsList } from "../../hooks/usePatientsList";

export const PatientsHeaderCards = () => {
  const { t } = useTranslation();
  const {
    loading,
    total,
    totalActive,
    totalFiltered,
  } = usePatientsList();

  const patientsHeaderCards = useMemo(() => {
    return [
      {
        text: t("patients.headerCards.total"),
        value: total,
      },
      {
        text: t("patients.headerCards.actives"),
        value: totalActive,
      },
      {
        text: t("patients.headerCards.filtered"),
        value: totalFiltered,
      },
    ];
  }, [t, total, totalActive, totalFiltered]);

  return (
    <CommonHeaderCards
      loading={loading}
      cards={patientsHeaderCards}
    />
  );
};
