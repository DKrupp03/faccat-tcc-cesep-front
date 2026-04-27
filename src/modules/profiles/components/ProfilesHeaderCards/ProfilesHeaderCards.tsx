import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconFilter, IconStethoscope, IconTextSpellcheck, IconUsers } from "@tabler/icons-react";

import { COLORS } from "@/shared/theme";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";

import { useProfiles } from "../../hooks/useProfiles";

export const ProfilesHeaderCards = () => {
  const { t } = useTranslation();
  const {
    module,
    loading,
    total,
    totalActive,
    totalFiltered,
  } = useProfiles();

  const profilesHeaderCards = useMemo(() => {
    return [
      {
        text: t(`profiles.${module}.headerCards.total`),
        value: total,
        icon: module === "therapists"
          ? <IconStethoscope size={28} stroke={1.5} color={COLORS.grey70} />
          : <IconUsers size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t(`profiles.${module}.headerCards.actives`),
        value: totalActive,
        icon: <IconTextSpellcheck size={28} stroke={1.5} color={COLORS.grey70} />,
      },
      {
        text: t(`profiles.${module}.headerCards.filtered`),
        value: totalFiltered,
        icon: <IconFilter size={28} stroke={1.5} color={COLORS.grey70} />,
      },
    ];
  }, [t, module, total, totalActive, totalFiltered]);

  return (
    <CommonHeaderCards
      loading={loading}
      cards={profilesHeaderCards}
    />
  );
};
