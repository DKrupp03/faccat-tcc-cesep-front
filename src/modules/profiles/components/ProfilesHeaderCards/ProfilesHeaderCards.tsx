import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";

import { useProfilesCommon } from "../../hooks/useProfilesCommon";
import type { ModuleKey } from "@/shared/contexts/ModulesContext";

type ProfilesHeaderCardsProps = {
  module: ModuleKey;
  loading: boolean;
  total: number;
  totalActive: number;
  totalFiltered: number;
};

export const ProfilesHeaderCards = ({
  module,
  loading,
  total,
  totalActive,
  totalFiltered,
}: ProfilesHeaderCardsProps) => {
  const { getProfilesHeaderCards } = useProfilesCommon();

  return (
    <CommonHeaderCards
      loading={loading}
      cards={getProfilesHeaderCards(module, total, totalActive, totalFiltered)}
    />
  );
};
