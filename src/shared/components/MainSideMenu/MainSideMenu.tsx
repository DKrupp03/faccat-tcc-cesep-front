import { useMemo } from "react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  IconUserSquareRounded,
  IconLogout2
} from "@tabler/icons-react";

import { CommonAvatar } from "../CommonAvatar/CommonAvatar";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { COLORS } from "@/shared/theme";
import logo from "@/shared/assets/logo.png";

import styles from "./MainSideMenu.module.css";

const { Text } = Typography;

export const MainSideMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    profile,
    logout,
  } = useAuth();
  const {
    isModuleActive,
    modules,
  } = useModules();

  const allowedModules = useMemo(() => (
    modules.filter((mod) => !mod.notAllowed)
  ), [modules]);

  return (
    <Flex vertical className={styles.menu}>
      <Flex justify="center" align="center" className={styles.header}>
        <img
          src={logo}
          alt="CESEP"
          className={styles.logo}
        />
      </Flex>

      <Flex justify="start" gap={6} vertical className={styles.modules}>
        <Text className={styles.text}>
          {t("common.mainMenu").toUpperCase()}
        </Text>

        {allowedModules.map((mod) => (
          <Flex
            key={mod.key}
            align="center" gap={12} className={styles.module}
            onClick={() => navigate(mod.path)}
            style={isModuleActive(mod.key)
              ? { backgroundColor: COLORS.background.light, color: COLORS.primary.main }
              : undefined}
          >
            <Flex align="center">
              {mod.icon}
            </Flex>
            <Flex align="center">
              {mod.name}
            </Flex>
          </Flex>
        ))}

        <Text
          className={styles.text}
          style={{ marginTop: 12 }}
        >
          {t("common.configs").toUpperCase()}
        </Text>

        <Flex align="center" gap={12} className={styles.module}>
          <Flex align="center">
            <IconUserSquareRounded size={16} color={COLORS.primary.grey} />
          </Flex>
          <Flex align="center">
            {t("common.myAccount")}
          </Flex>
        </Flex>
      </Flex>

      {profile && (
        <Flex gap={16} align="center" className={styles.footer}>
          <div className={styles.avatarContainer}>
            <CommonAvatar profile={profile} />
          </div>

          <Flex vertical className={styles.nameContainer}>
            <Text className={styles.name}>
              {profile.name}
            </Text>
            <Text className={styles.text}>
              {t(`common.roles.${profile.role}`)}
            </Text>
          </Flex>

          <IconLogout2
            size={18}
            color={COLORS.primary.grey}
            className={styles.footerIcon}
            onClick={logout}
          />
        </Flex>
      )}
    </Flex>
  );
};
