import { useMemo } from "react";
import { Flex, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { CommonButton } from "../CommonButton/CommonButton";
import { CommonAvatar } from "../CommonAvatar/CommonAvatar";
import logoMini from "@/shared/assets/logoMini.png";

import styles from "./MainSideMenu.module.css";

export const MainSideMenu = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
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
        <CommonAvatar
          photoUrl={profile?.photo_url}
          style={{ cursor: "pointer" }}
          size={50}
          circular
        />
      </Flex>
    </Flex>
  );
};
