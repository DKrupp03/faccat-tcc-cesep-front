import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip } from "antd";
import {
  IconFilter,
  IconReload,
  IconPlus,
  IconStethoscope,
  IconUsers,
  IconTextSpellcheck,
} from "@tabler/icons-react";

import { useModules } from "@/shared/hooks/useModules";
import { type ModuleKey } from "@/shared/contexts/ModulesContext";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { CommonHeaderCards } from "@/shared/components/CommonHeaderCards/CommonHeaderCards";
import { CommonTable } from "@/shared/components/CommonTable/CommonTable";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";

import { ProfilesProvider } from "./providers/ProfilesProvider";
import { useProfiles } from "./hooks/useProfiles";
import { useProfilesCommon } from "./hooks/useProfilesCommon";
import { ProfilesFilterModal } from "./components/ProfilesFilterModal/ProfilesFilterModal";
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

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    if (module) {
      changeActiveModule(module);
      filtratePanel();
    }
  }, [module]);

  return (
    <>
      <Flex
        vertical
        className={styles.panel}
      >
        <CommonHeader
          title={t(`common.modules.${module}`)}
          buttons={[
            <Tooltip title={t("common.actions.reload")}>
              <CommonButton
                onClick={() => {}}
                icon={<IconReload size={18} />}
                size="large"
                outline
              />
            </Tooltip>,
            <Tooltip title={t("common.actions.filtrate")}>
              <CommonButton
                onClick={() => setIsFilterOpen(true)}
                icon={<IconFilter size={18} />}
                size="large"
                outline
              />
            </Tooltip>,
            <Tooltip title={t(`profiles.${module}.actions.create`)}>
              <CommonButton
                onClick={() => {}}
                icon={<IconPlus size={18} />}
                size="large"
                buttonVariant="primary"
              />
            </Tooltip>,
          ]}
        />

        <Flex
          vertical gap={24}
          className={styles.body}
        >
          <CommonHeaderCards
            loading={loading}
            cards={[
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
            ]}
          />

          <CommonTable
            titleHeader={t(`common.modules.${module}`)}
            columns={getProfilesColumnFields(module)}
            dataSource={profiles}
          />
        </Flex>
      </Flex>

      <ProfilesFilterModal
        isOpen={isFilterOpen}
        close={() => setIsFilterOpen(false)}
      />
    </>
  );
};

export default ProfilesPage;
