import { useCallback, useMemo, useState } from "react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
  IconCalendarMonth,
  IconStethoscope,
  IconUsers,
  IconPremiumRights,
  IconUserSquareRounded,
  IconLogout2
} from "@tabler/icons-react";

import { CommonAvatar } from "../CommonAvatar/CommonAvatar";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { PATHS } from "@/routes/paths";
import { COLORS } from "@/shared/theme";
import logo from "@/shared/assets/logo.png";

import styles from "./MainSideMenu.module.css";

type ModuleKey = "services" | "therapists" | "patients" | "payments";

type ModuleType = {
  key: ModuleKey;
  path: string;
  name: string;
  icon: React.ReactNode;
};

const { Text } = Typography;

export const MainSideMenu = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();

  const [activeModule, setActiveModule] = useState<ModuleKey>("services");

  const isModuleActive = useCallback((key: ModuleKey) => (
    activeModule === key
  ), [activeModule]);

  const modules: ModuleType[] = useMemo(() => [
    {
      key: "services",
      path: PATHS.services,
      name: t("common.modules.services"),
      icon: (
        <IconCalendarMonth
          size={16}
          color={isModuleActive("services") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
    {
      key: "therapists",
      path: PATHS.therapists,
      name: t("common.modules.therapists"),
      icon: (
        <IconStethoscope
          size={16}
          color={isModuleActive("therapists") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
    {
      key: "patients",
      path: PATHS.patients,
      name: t("common.modules.patients"),
      icon: (
        <IconUsers
          size={16}
          color={isModuleActive("patients") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
    {
      key: "payments",
      path: PATHS.payments,
      name: t("common.modules.payments"),
      icon: (
        <IconPremiumRights
          size={16}
          color={isModuleActive("payments") ? COLORS.primary[500] : COLORS.gray[300]}
        />
      ),
    },
  ], [isModuleActive, t]);

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

        {modules.map((mod) => (
          <Flex
            key={mod.key}
            align="center" gap={12} className={styles.module}
            style={isModuleActive(mod.key)
              ? { backgroundColor: COLORS.gray[50], color: COLORS.primary[500] }
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
            <IconUserSquareRounded size={16} color={COLORS.gray[300]} />
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
            size={20}
            color={COLORS.gray[300]}
            className={styles.footerIcon}
          />
        </Flex>
      )}
    </Flex>
  );
}
