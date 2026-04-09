import { useState, useCallback } from "react";
import { Flex, Typography, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { useNotification } from "@/shared/hooks/useNotification";

import { AuthBackButton } from "./components/AuthBackButton/AuthBackButton";
import { AuthCardContainer } from "./components/AuthCardContainer/AuthCardContainer";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm/ForgotPasswordForm";
import { ResetPasswordForm } from "./components/ResetPasswordForm/ResetPasswordForm";
import { AuthService } from "./services/AuthService";
import styles from "./page.module.css";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthCardContainer>
      <Flex vertical>
        <Title
          level={3}
          className={styles.title}
        >
          {t("auth.login.welcome")}
        </Title>
        <Text className={styles.text}>
          {t("auth.login.subtitle")}
        </Text>
      </Flex>

      <LoginForm />
    </AuthCardContainer>
  );
}

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { openNotification } = useNotification();

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
  
      if (response.success) {
        setEmail(emailValue);
        setEmailSent(true);
  
        if (isResend) {
          openNotification(
            "info",
            t("auth.forgotPassword.linkSent"),
            t("auth.forgotPassword.verifyEmail"),
          );
        }
      } else {
        openNotification("error", response.errors!);
      }
    } finally {
      setLoading(false);
    }
  }, [openNotification]);

  return (
    <AuthCardContainer>
      {emailSent ? (
        <Flex vertical gap={8}>
          <Flex align="center" vertical gap={4}>
            <Flex align="center" gap={12}>
              <AuthBackButton />
              <Title level={3} className={styles.title}>
                {t("auth.forgotPassword.verifyEmail")}
              </Title>
            </Flex>
            <Text className={styles.text} style={{ textAlign: "center" }}>
              {t("auth.forgotPassword.linkSent")}
            </Text>
          </Flex>

          <Divider />

          <Flex align="center" vertical gap={4}>
            <Text className={styles.text}>
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
              <AuthBackButton />
              <Title level={3} className={styles.title}>
                {t("auth.forgotPassword.recoverPassword")}
              </Title>
            </Flex>

            <Text className={styles.text}>
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
}

export const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("reset_password_token") as string;

  return (
    <AuthCardContainer>
      <Flex vertical gap={4}>
        <Flex align="center" gap={12}>
          <AuthBackButton />
          <Title level={3} className={styles.title}>
            {t("auth.resetPassword.resetPassword")}
          </Title>
        </Flex>
        <Text className={styles.text}>
          {t("auth.resetPassword.resetPassword.description")}
        </Text>
      </Flex>

      <ResetPasswordForm token={token} />
    </AuthCardContainer>
  );
}