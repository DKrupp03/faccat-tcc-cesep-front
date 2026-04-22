import { useState, useMemo } from "react";
import { Flex, Typography } from "antd";
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
  const { isModuleActive, modules, isModuleAllowed } = useModules();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const allowedModules = useMemo(() => (
    modules.filter((mod) => isModuleAllowed(mod.key))
  ), [modules, isModuleAllowed]);

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
          style={{ height: collapsed ? 40 : 50 }}
        />
      </Flex>

      <Flex
        vertical gap={8}
        className={styles.items}
      >
        {allowedModules.map((module) => (
          <Flex
            justify="center"
            style={{
              borderRight: isModuleActive(module.key)
                ? `3px solid ${COLORS.blue}`
                : "none",
            }}
          >
            <Flex
              justify={collapsed ? "center" : "start"} align="center" gap={12}
              className={styles.item}
              onClick={() => navigate(module.path)}
              style={{
                backgroundColor: isModuleActive(module.key)
                  ? `${COLORS.white}1A`
                  : "transparent",
                width: collapsed ? 48 : "100%",
                margin: collapsed ? undefined : "0px 18px"
              }}
            >
              {module.icon}
              {!collapsed && (
                <Text
                  style={{
                    color: isModuleActive(module.key)
                      ? COLORS.blue
                      : COLORS.grey50,
                  }}
                >
                  {module.name}
                </Text>
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>

      {profile && (
        <Flex
          gap={12} align="center" justify={collapsed ? "center" : "space-between"}
          className={styles.footer}
        >
          <div className={styles.avatarContainer}>
            <CommonAvatar
              name={profile.name}
              photoUrl={profile.photo_url}
            />
          </div>

          {!collapsed && (
            <>
              <Flex
                vertical
                className={styles.infos}
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
                color={COLORS.grey50}
                cursor="pointer"
                onClick={logout}
              />
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};
