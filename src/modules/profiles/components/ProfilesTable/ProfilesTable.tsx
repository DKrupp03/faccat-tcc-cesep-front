import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonTable, type CommonTableProps } from "@/shared/components/CommonTable/CommonTable";

import { useProfilesCommon } from "../../hooks/useProfilesCommon";
import type { Profile } from "../../types/profile";

type ProfilesTableProps = CommonTableProps<Profile> & {
  module: ModuleKey;
};

export const ProfilesTable = ({
  module,
  ...props
}: ProfilesTableProps) => {
  const { t } = useTranslation();
  const { profilesColumnFields } = useProfilesCommon({ module });

  return (
    <CommonTable<Profile>
      titleHeader={t(`common.modules.${module}`)}
      columns={profilesColumnFields}
      {...props}
    />
  );
};
