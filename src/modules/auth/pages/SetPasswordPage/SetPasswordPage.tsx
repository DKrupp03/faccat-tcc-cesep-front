import { useCallback, useEffect } from "react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useModules } from "@/shared/hooks/useModules";
import { PATHS } from "@/routes/paths";

import { AuthCardContainer } from "../../components/AuthCardContainer/AuthCardContainer";
import { SetPasswordForm } from "../../components/SetPasswordForm/SetPasswordForm";

const { Title, Text } = Typography;

const SetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeDocumentTitle } = useModules();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("reset_password_token") as string;

  const goBack = useCallback(() => {
    navigate(PATHS.login);
  }, [navigate]);

  useEffect(() => {
    changeDocumentTitle(t("auth.pages.setPassword"));
  }, [changeDocumentTitle, t]);

  return (
    <AuthCardContainer>
      <Flex vertical gap={4}>
        <Title level={3}>
          {t("auth.setPassword.setPassword")}
        </Title>
        <Text>
          {t("auth.setPassword.setPassword.description")}
        </Text>
      </Flex>

      <SetPasswordForm token={token} />
    </AuthCardContainer>
  );
};

export default SetPasswordPage;
