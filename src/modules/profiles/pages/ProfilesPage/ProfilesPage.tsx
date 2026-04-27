import { useEffect } from "react";
import { Flex } from "antd";

import { useModules } from "@/shared/hooks/useModules";
import { type ModuleKey } from "@/shared/contexts/ModulesContext";

import { ProfilesProvider } from "../../providers/ProfilesProvider";
import { useProfiles } from "../../hooks/useProfiles";
import { ProfilesHeader } from "../../components/ProfilesHeader/ProfilesHeader";
import { ProfilesHeaderCards } from "../../components/ProfilesHeaderCards/ProfilesHeaderCards";
import { ProfilesTable } from "../../components/ProfilesTable/ProfilesTable";
import styles from "./ProfilesPage.module.css";

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
  const { changeActiveModule } = useModules();
  const { filtratePanel } = useProfiles();

  useEffect(() => {
    if (module) {
      changeActiveModule(module);
      filtratePanel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module]);

  return (
    <>
      <Flex vertical className={styles.panel}>
        <ProfilesHeader />
        <Flex vertical gap={24} className={styles.body}>
          <ProfilesHeaderCards />
          <ProfilesTable />
        </Flex>
      </Flex>
    </>
  );
};

export default ProfilesPage;
