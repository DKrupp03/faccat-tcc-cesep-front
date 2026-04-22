import { useEffect } from "react";
import { Flex } from "antd";

import { useModules } from "@/shared/hooks/useModules";
import { type ModuleKey } from "@/shared/contexts/ModulesContext";
import { ProfilesProvider } from "./providers/ProfilesProvider";
import { useProfiles } from "./hooks/useProfiles";
import { ProfilesHeader } from "./components/ProfilesHeader/ProfilesHeader";
import { ProfilesHeaderCards } from "./components/ProfilesHeaderCards/ProfilesHeaderCards";
import { ProfilesTable } from "./components/ProfilesTable/ProfilesTable";
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
  const { activeModule, changeActiveModule } = useModules();
  const {
    filtratePanel,
    loading,
    total,
    totalActive,
    totalFiltered,
    profiles,
    setIsFilterOpen,
  } = useProfiles();

  useEffect(() => {
    if (module) {
      changeActiveModule(module);
      filtratePanel();
    }
  }, [module]);

  return (
    <>
      <Flex vertical className={styles.panel}>
        <ProfilesHeader
          module={activeModule!}
          openFilter={() => setIsFilterOpen(true)}
          reload={() => filtratePanel()}
        />

        <Flex vertical gap={24} className={styles.body}>
          <ProfilesHeaderCards
            module={activeModule!}
            loading={loading}
            total={total}
            totalActive={totalActive}
            totalFiltered={totalFiltered}
          />

          <ProfilesTable
            module={activeModule!}
            profiles={profiles}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default ProfilesPage;
