import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconFilter, IconStethoscope, IconTextSpellcheck } from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
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
        icon: <IconStethoscope size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("therapists.headerCards.actives"),
        value: totalActive,
        icon: <IconTextSpellcheck size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t("therapists.headerCards.filtered"),
        value: totalFiltered,
        icon: <IconFilter size={28} stroke={1.5} color={COLORS.grey70} />,
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
