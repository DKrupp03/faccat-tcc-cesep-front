import { useCallback, useEffect } from "react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useModules } from "@/shared/hooks/useModules";
import { CommonBackButton } from "../../../../shared/components/CommonBackButton/CommonBackButton";
import { PATHS } from "@/routes/paths";

import { AuthCardContainer } from "../../components/AuthCardContainer/AuthCardContainer";
import { ResetPasswordForm } from "../../components/ResetPasswordForm/ResetPasswordForm";

const { Title, Text } = Typography;

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeDocumentTitle } = useModules();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("reset_password_token") as string;

  const goBack = useCallback(() => {
    navigate(PATHS.login);
  }, [navigate]);

  useEffect(() => {
    changeDocumentTitle(t("auth.pages.resetPassword"));
  }, [changeDocumentTitle, t]);

  return (
    <AuthCardContainer>
      <Flex vertical gap={4}>
        <Flex align="center" gap={12}>
          <CommonBackButton onClick={goBack} />
          <Title level={3}>
            {t("auth.resetPassword.resetPassword")}
          </Title>
        </Flex>
        <Text>
          {t("auth.resetPassword.resetPassword.description")}
        </Text>
      </Flex>

      <ResetPasswordForm token={token} />
    </AuthCardContainer>
  );
};

export default ResetPasswordPage;