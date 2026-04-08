import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Typography, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { IconChevronLeft } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { useNotification } from "@/shared/hooks/useNotification";
import { colors } from "@/shared/theme";
import { PATHS } from "@/routes/paths";
import logo from "@/shared/assets/logo.png";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm/ForgotPasswordForm";
import { ForgotPasswordService } from "./services/ForgotPasswordService";
import styles from "./page.module.css";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify="center"
      className={styles.page}
    >
      <Flex
        gap={32}
        vertical
        className={styles.card}
      >
        <Flex justify="center">
          <img
            src={logo}
            alt="CESEP"
            className={styles.logo}
          />
        </Flex>

        <Flex vertical>
          <Title
            level={3}
            className={styles.title}
          >
            {t("login.welcome")}
          </Title>
          <Text className={styles.text}>
            {t("login.subtitle")}
          </Text>
        </Flex>

        <LoginForm />
      </Flex>
    </Flex>
  );
}

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleRequestPasswordRecover = useCallback(async (
    emailValue: string,
    isResend: boolean = false,
  ) => {
    const response = await ForgotPasswordService.requestPasswordRecover(emailValue);

    if (response.success) {
      setEmail(emailValue);
      setEmailSent(true);

      if (isResend) {
        openNotification(
          "info",
          t("forgotPassword.linkSent"),
          t("forgotPassword.verifyEmail"),
        );
      }
    } else {
      openNotification("error", response.errors!);
    }
  }, [openNotification]);

  const BackButton = () => (
    <CommonButton
      size="small"
      className={styles.backButton}
      onClick={() => navigate(PATHS.login)}
    >
      <IconChevronLeft color={colors.gray[300]} />
    </CommonButton>
  );

  return (
    <Flex
      align="center"
      justify="center"
      className={styles.page}
    >
      <Flex
        gap={32}
        vertical
        className={styles.card}
      >
        <Flex justify="center">
          <img
            src={logo}
            alt="CESEP"
            className={styles.logo}
          />
        </Flex>

        {emailSent ? (
          <Flex vertical gap={8}>
            <Flex align="center" vertical gap={4}>
              <Flex align="center" gap={12}>
                <BackButton />
                <Title level={3} className={styles.title}>
                  {t("forgotPassword.verifyEmail")}
                </Title>
              </Flex>
              <Text className={styles.text} style={{ textAlign: "center" }}>
                {t("forgotPassword.linkSent")}
              </Text>
            </Flex>

            <Divider />

            <Flex align="center" vertical gap={4}>
              <Text className={styles.text}>
                {t("forgotPassword.notReceived")}
              </Text>
              <Text
                className={styles.resendText}
                onClick={() => handleRequestPasswordRecover(email, true)}
              >
                {t("forgotPassword.resend")}
              </Text>
            </Flex>
          </Flex>
        ) : (
          <>
            <Flex vertical gap={4}>
              <Flex align="center" gap={12}>
                <BackButton />
                <Title level={3} className={styles.title}>
                  {t("forgotPassword.recoverPassword")}
                </Title>
              </Flex>
              <Text className={styles.text}>
                {t("forgotPassword.recoverPassword.description")}
              </Text>
            </Flex>
    
            <ForgotPasswordForm onSubmit={handleRequestPasswordRecover} />
          </>
        )}
      </Flex>
    </Flex>
  );
}