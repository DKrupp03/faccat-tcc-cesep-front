import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { IconUserSquareRounded, IconLogout } from "@tabler/icons-react";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { CommonAvatar } from "../CommonAvatar/CommonAvatar";
import { CommonDropdown } from "../CommonDropdown/CommonDropdown";

import styles from "./CommonAvatarDropdown.module.css";

const { Text } = Typography;

export const CommonAvatarDropdown = () => {
  const { t } = useTranslation();
  const { profile, logout } = useAuth();

  return (
    <CommonDropdown
      placement="right"
      align={{ offset: [12, -20] }}
      padding={12}
      arrow
      prefix={
        <Flex
          align="center" gap={12}
          className={styles.header}
        >
          <CommonAvatar
            photoUrl={profile?.photo_url}
            size={40}
            circular
          />
          <Flex vertical>
            <Text className={styles.name}>
              {profile?.name}
            </Text>
            <Text className={styles.role}>
              {profile?.role ? t(`common.roles.${profile.role}`) : undefined}
            </Text>
          </Flex>
        </Flex>
      }
      options={[
        {
          onClick: () => {},
          icon: <IconUserSquareRounded size={16} />,
          buttonVariant: "noBorder",
          children: t("common.myProfile"),
          contentAlign: "flex-start",
        },
        {
          onClick: logout,
          icon: <IconLogout size={16} />,
          buttonVariant: "noBorder",
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
  );
};
