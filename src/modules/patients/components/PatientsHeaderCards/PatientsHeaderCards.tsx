import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconFilter, IconTextSpellcheck, IconUsers } from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
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
        icon: <IconUsers size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("patients.headerCards.actives"),
        value: totalActive,
        icon: <IconTextSpellcheck size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("patients.headerCards.filtered"),
        value: totalFiltered,
        icon: <IconFilter size={28} stroke={1.5} color={COLORS.grey70} />,
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
