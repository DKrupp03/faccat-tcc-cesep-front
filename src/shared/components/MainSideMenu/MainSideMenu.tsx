import { useState, useMemo } from "react";
import { Flex, Typography, Menu } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconLogout2 } from "@tabler/icons-react";

import { CommonAvatar } from "../CommonAvatar/CommonAvatar";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useModules } from "@/shared/hooks/useModules";
import { COLORS } from "@/shared/theme";
import logo from "@/shared/assets/logo.png";
import logoMini from "@/shared/assets/logoMini.png";

import styles from "./MainSideMenu.module.css";

const { Text } = Typography;

export const MainSideMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const { activeModule, modules, isModuleAllowed } = useModules();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const allowedModules = useMemo(() => (
    modules.filter((mod) => isModuleAllowed(mod.key))
  ), [modules, isModuleAllowed]);

  const menuItems: MenuProps["items"] = useMemo(() => (
    allowedModules.map((mod) => ({
      key: mod.key,
      icon: mod.icon,
      label: mod.name,
      onClick: () => navigate(mod.path),
    }))
  ), [allowedModules, navigate]);

  return (
    <Flex
      vertical
      className={styles.menu}
      style={{ width: collapsed ? 84 : 250 }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <Flex
        justify="center" align="center"
        className={styles.header}
      >
        <img
          src={collapsed ? logoMini : logo}
          alt="CESEP"
          className={styles.logo}
        />
      </Flex>

      <div className={styles.itemsContainer}>
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          inlineIndent={16}
          selectedKeys={activeModule ? [activeModule] : []}
          items={menuItems}
          className={styles.items}
        />
      </div>

      {profile && (
        <Flex
          gap={12} align="center" justify={collapsed ? "center" : "space-between"}
          className={styles.footer}
        >
          <div className={styles.avatarContainer}>
            <CommonAvatar profile={profile} />
          </div>

          {!collapsed && (
            <>
              <Flex
                vertical
                className={styles.nameContainer}
              >
                <Text className={styles.name}>
                  {profile.name}
                </Text>
                <Text className={styles.role}>
                  {t(`common.roles.${profile.role}`)}
                </Text>
              </Flex>
    
              <IconLogout2
                size={18}
                color={COLORS.primary.grey}
                className={styles.logoutIcon}
                onClick={logout}
              />
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};
