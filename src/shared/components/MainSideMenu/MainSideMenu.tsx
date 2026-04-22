import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { IconUserSquareRounded, IconLogout } from "@tabler/icons-react";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { CommonButton } from "../CommonButton/CommonButton";
import { CommonAvatar } from "../CommonAvatar/CommonAvatar";
import { CommonDropdown } from "../CommonDropdown/CommonDropdown";
import logoMini from "@/shared/assets/logoMini.png";

import styles from "./MainSideMenu.module.css";

const { Text } = Typography;

export const MainSideMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const { isModuleActive, modules, isModuleAllowed } = useModules();

  const allowedModules = useMemo(() => (
    modules.filter((mod) => isModuleAllowed(mod.key))
  ), [modules, isModuleAllowed]);

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

      <Flex
        vertical gap={16}
        className={styles.items}
      >
        {allowedModules.map((module) => (
          <Flex justify="center">
            <Tooltip title={module.name} placement="right">
              <CommonButton
                onClick={() => navigate(module.path)}
                icon={module.icon}
                size="large"
                className={styles.item}
                buttonVariant={isModuleActive(module.key) ? "primary" : "outline"}
                outline={!isModuleActive(module.key)}
                hoverEffect={!isModuleActive(module.key)}
              />
            </Tooltip>
          </Flex>
        ))}
      </Flex>

      <Flex
        justify="center" align="center"
        className={styles.footer}
      >
        <CommonDropdown
          placement="right"
          align={{ offset: [12, -20] }}
          arrow
          prefix={
            <Flex
              align="center" gap={12}
              className={styles.avatarPopoverHeader}
            >
              <CommonAvatar
                photoUrl={profile?.photo_url}
                size={40}
                circular
              />
              <Flex vertical>
                <Text className={styles.avatarPopoverName}>
                  {profile?.name}
                </Text>
                <Text className={styles.avatarPopoverRole}>
                  {t(`common.roles.${profile?.role}`)}
                </Text>
              </Flex>
            </Flex>
          }
          options={[
            {
              onClick: () => {},
              icon: <IconUserSquareRounded size={18} />,
              buttonVariant: "noBorder",
              circular: false,
              children: t("common.myProfile"),
              contentAlign: "flex-start",
            },
            {
              onClick: logout,
              icon: <IconLogout size={18} />,
              buttonVariant: "noBorder",
              circular: false,
              children: t("common.actions.exit"),
              contentAlign: "flex-start",
            },
          ]}
        >
          <CommonAvatar
            photoUrl={profile?.photo_url}
            style={{ cursor: "pointer" }}
            size={50}
            circular
          />
        </CommonDropdown>
      </Flex>
    </Flex>
  );
};
