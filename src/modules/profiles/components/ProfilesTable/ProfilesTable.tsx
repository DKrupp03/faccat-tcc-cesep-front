import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";

import { useProfilesCommon } from "../../hooks/useProfilesCommon";
import type { Profile } from "../../types/profile";

type ProfilesTableProps = {
  module: ModuleKey;
  profiles: Profile[]
};

export const ProfilesTable = ({
  module,
  profiles,
}: ProfilesTableProps) => {
  const { t } = useTranslation();
  const { getProfilesColumnFields } = useProfilesCommon();

  return (
    <CommonTable
      titleHeader={t(`common.modules.${module}`)}
      columns={getProfilesColumnFields(module)}
      dataSource={profiles}
    />
  );
};
