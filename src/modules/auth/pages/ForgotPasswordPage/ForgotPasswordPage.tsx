import { useState, useCallback, useEffect } from "react";
import { Flex, Typography, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useModules } from "@/shared/hooks/useModules";
import { useNotification } from "@/shared/hooks/useNotification";
import { CommonBackButton } from "../../../../shared/components/CommonBackButton/CommonBackButton";
import { PATHS } from "@/routes/paths";

import { AuthCardContainer } from "../../components/AuthCardContainer/AuthCardContainer";
import { ForgotPasswordForm } from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import { AuthService } from "../../services/AuthService";
import styles from "./ForgotPasswordPage.module.css";

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const { changeDocumentTitle } = useModules();

  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleRequestPasswordRecover = useCallback(async (
    emailValue: string,
    isResend: boolean = false,
  ) => {
    setLoading(true);

    try {
      const response = await AuthService.requestPasswordRecover(emailValue);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      setEmail(emailValue);
      setEmailSent(true);

      if (isResend) {
        openNotification(
          "info",
          t("auth.forgotPassword.linkSent"),
          t("auth.forgotPassword.verifyEmail"),
        );
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
    }
  }, [openNotification, t]);

  const goBack = useCallback(() => {
    navigate(PATHS.login);
  }, [navigate]);

  useEffect(() => {
    changeDocumentTitle(t("auth.pages.forgotPassword"));
  }, [changeDocumentTitle, t]);

  return (
    <AuthCardContainer>
      {emailSent ? (
        <Flex vertical gap={8}>
          <Flex align="center" vertical gap={4}>
            <Flex align="center" gap={12}>
              <CommonBackButton onClick={goBack} />
              <Title level={3}>
                {t("auth.forgotPassword.verifyEmail")}
              </Title>
            </Flex>
            <Text className={styles.linkSent}>
              {t("auth.forgotPassword.linkSent")}
            </Text>
          </Flex>

          <Divider />

          <Flex align="center" vertical gap={4}>
            <Text>
              {t("auth.forgotPassword.notReceived")}
            </Text>
            <Text
              className={styles.resendText}
              onClick={() => handleRequestPasswordRecover(email, true)}
            >
              {t("auth.forgotPassword.resend")}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex vertical gap={4}>
            <Flex align="center" gap={12}>
              <CommonBackButton onClick={goBack} />
              <Title level={3}>
                {t("auth.forgotPassword.recoverPassword")}
              </Title>
            </Flex>

            <Text>
              {t("auth.forgotPassword.recoverPassword.description")}
            </Text>
          </Flex>

          <ForgotPasswordForm
            onSubmit={handleRequestPasswordRecover}
            loading={loading}
          />
        </>
      )}
    </AuthCardContainer>
  );
};

export default ForgotPasswordPage;