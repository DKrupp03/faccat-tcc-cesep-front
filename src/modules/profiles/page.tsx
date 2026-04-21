import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconCirclePlus,
} from "@tabler/icons-react";

import { useModules } from "@/shared/hooks/useModules";
import { type ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

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
    totalActive,
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
      <CommonHeader
        title={t(`common.modules.${module}`)}
        options={[]}
        buttons={[
          <Tooltip title={t("common.actions.reload")}>
            <CommonButton
              onClick={() => {}}
              icon={<IconReload size={16} />}
              className={styles.headerIconButtons}
            />
          </Tooltip>,
          <Tooltip title={t("common.actions.filtrate")}>
            <CommonButton
              onClick={() => {}}
              icon={<IconFilter size={16} />}
              className={styles.headerIconButtons}
            />
          </Tooltip>,
          <Tooltip title={t(`profiles.${module}.actions.create`)}>
            <CommonButton
              onClick={() => {}}
              icon={<IconCirclePlus size={16} />}
              className={styles.headerIconButtons}
            />
          </Tooltip>,
        ]}
      />
      <CommonHeaderCards
        loading={loading}
        cards={[
          {
            title: t("common.headerCards.total"),
            text: t(`profiles.${module}.headerCards.total`),
            value: total,
            progress: 100,
          },
          {
            title: t("common.headerCards.filtered"),
            text: t(`profiles.${module}.headerCards.filtered`),
            value: totalFiltered,
            progress: totalFiltered / total * 100,
          },
          {
            title: t("common.headerCards.actives"),
            text: t(`profiles.${module}.headerCards.actives`),
            value: totalActive,
            progress: totalActive / total * 100,
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
