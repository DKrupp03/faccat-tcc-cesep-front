import { useEffect } from "react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useModules } from "@/shared/hooks/useModules";

import { AuthCardContainer } from "../../components/AuthCardContainer/AuthCardContainer";
import { LoginForm } from "../../components/LoginForm/LoginForm";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { t } = useTranslation();
  const { changeDocumentTitle } = useModules();

  useEffect(() => {
    changeDocumentTitle(t("auth.pages.login"));
  }, [t, changeDocumentTitle]);

  return (
    <AuthCardContainer>
      <Flex vertical>
        <Title level={3}>
          {t("auth.login.welcome")}
        </Title>
        <Text>
          {t("auth.login.subtitle")}
        </Text>
      </Flex>

      <LoginForm />
    </AuthCardContainer>
  );
};

export default LoginPage;
