import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { colors } from "@/shared/theme";
import logo from "@/shared/assets/logo.png";

import { LoginForm } from "./components/LoginForm/LoginForm";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: colors.gray[50],
      }}
    >
      <Flex
        gap={32}
        vertical
        style={{
          width: 500,
          boxSizing: "border-box",
          borderRadius: 30,
          padding: 50,
          backgroundColor: colors.white,
          border: `1px solid ${colors.gray[100]}`,
        }}
      >
        <Flex justify="center">
          <img
            src={logo}
            alt="CESEP"
            style={{ height: 72 }}
          />
        </Flex>

        <div>
          <Title
            level={3}
            style={{
              margin: 0,
              color: colors.primary[900],
              fontWeight: 700,
            }}
          >
            {t("login.welcome")}
          </Title>
          <Text style={{ color: colors.gray[300] }}>
            {t("login.subtitle")}
          </Text>
        </div>

        <LoginForm />
      </Flex>
    </Flex>
  );
}
