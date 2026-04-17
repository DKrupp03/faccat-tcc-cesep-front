import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { IconStethoscope, IconFilter } from "@tabler/icons-react";

import { useModules } from "@/shared/hooks/useModules";
import { type ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";
import { COLORS } from "@/shared/theme";

import { ProfilesProvider } from "./providers/ProfilesProvider";
import { useProfiles } from "./hooks/useProfiles";
import styles from "./page.module.css";

type ProfilesPageProps = {
  module: ModuleKey;
};

const ProfilesPage = ({ module }: ProfilesPageProps) => {
  return (
    <ProfilesProvider module={module}>
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
    filtratePanel,
  } = useProfiles();

  useEffect(() => {
    if (module) {
      changeActiveModule(module);
      filtratePanel();
    }
  }, [module]);

  return (
    <ProfilesProvider module={module}>
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
              icon: (
                <IconStethoscope
                  size={26}
                  stroke={1.5}
                  color={COLORS.primary.grey}
                />
              )
            },
            {
              text: t(`profiles.${module}.totalFiltered`),
              value: totalFiltered,
              icon: (
                <IconFilter
                  size={26}
                  stroke={1.5}
                  color={COLORS.primary.grey}
                />
              )
            }
          ]}
        />
      </Flex>
    </ProfilesProvider>
  );
};

export default ProfilesPage;
