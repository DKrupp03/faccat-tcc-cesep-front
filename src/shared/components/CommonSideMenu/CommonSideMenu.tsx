import { useCallback } from "react";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";

import { useModules } from "@/shared/hooks/useModules";
import { CommonTabs } from "../CommonTabs/CommonTabs";
import { CommonAvatarDropdown } from "../CommonAvatarDropdown/CommonAvatarDropdown";
import { ProfileFormProvider } from "@/modules/profiles/providers/ProfileFormProvider";
import logoMini from "@/shared/assets/logoMini.png";

import styles from "./CommonSideMenu.module.css";
import { PATHS } from "@/routes/paths";

export const CommonSideMenu = () => {
  const navigate = useNavigate();
  const { activeModule, moduleTabs } = useModules();

  const onChangeTab = useCallback((key: string) => {
    navigate(PATHS[key as keyof typeof PATHS]);
  }, [navigate]);

  return (
    <Flex
      vertical
      className={styles.menu}
    >
      <Flex
        justify="center" align="center"
        className={styles.header}
      >
        <Flex
          justify="center" align="center"
          className={styles.logoContainer}
        >
          <img
            src={logoMini}
            alt="CESEP"
            className={styles.logo}
          />
        </Flex>
      </Flex>

      <CommonTabs
        tabs={moduleTabs}
        activeTab={activeModule!}
        onChangeTab={onChangeTab}
        containerClass={styles.tabsContainer}
      />

      <Flex
        justify="center" align="center"
        className={styles.footer}
      >
        <ProfileFormProvider>
          <CommonAvatarDropdown />
        </ProfileFormProvider>
      </Flex>
    </Flex>
  );
};
