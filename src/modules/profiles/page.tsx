import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { IconStethoscope, IconUsers, IconFilter } from "@tabler/icons-react";

import { useModules } from "@/shared/hooks/useModules";
import { type ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { COLORS } from "@/shared/theme";

import { ProfilesProvider } from "./providers/ProfilesProvider";
import { useProfiles } from "./hooks/useProfiles";
import { useProfilesCommon } from "./hooks/useProfilesCommon";
import styles from "./page.module.css";

type ProfilesPageProps = {
  module: ModuleKey;
};

const ProfilesPage = ({ module }: ProfilesPageProps) => {
  return (
    <ProfilesProvider key={module} module={module}>
      <ProfilesPanel module={module} />
    </ProfilesProvider>
  );
};

const ProfilesPanel = ({ module }: ProfilesPageProps) => {
  const { t } = useTranslation();
  const { changeActiveModule } = useModules();
  const {
    loading,
    totalFiltered,
    total,
    profiles,
    filtratePanel,
  } = useProfiles();
  const { getProfilesColumnFields } = useProfilesCommon();

  useEffect(() => {
    if (module) {
      changeActiveModule(module);
      filtratePanel();
    }
  }, [module]);

  return (
    <Flex
      vertical gap={24}
      className={styles.panel}
    >
      <CommonHeaderCards
        loading={loading}
        cards={[
          {
            text: t(`profiles.${module}.total`),
            value: total,
            icon: module === "therapists"
              ? <IconStethoscope size={26} stroke={1.5} color={COLORS.primary.grey} />
              : <IconUsers size={26} stroke={1.5} color={COLORS.primary.grey} />,
          },
          {
            text: t(`profiles.${module}.totalFiltered`),
            value: totalFiltered,
            icon: <IconFilter size={26} stroke={1.5} color={COLORS.primary.grey} />,
          }
        ]}
      />

      <CommonTable
        titleHeader={t(`common.modules.${module}`)}
        columns={getProfilesColumnFields(module)}
        dataSource={profiles}
      />
    </Flex>
  );
};

export default ProfilesPage;
