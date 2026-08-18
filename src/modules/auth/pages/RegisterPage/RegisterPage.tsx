import { useState, useCallback, useEffect } from "react";
import { Flex, Typography, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useModules } from "@/shared/hooks/useModules";
import { useNotification } from "@/shared/hooks/useNotification";
import { CommonBackButton } from "@/shared/components/CommonBackButton/CommonBackButton";
import type { ProfileRole } from "@/shared/types/profile";
import { PATHS } from "@/routes/paths";

import { AuthCardContainer } from "../../components/AuthCardContainer/AuthCardContainer";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { AuthService } from "../../services/AuthService";
import type { RegisterPayload } from "../../types/auth";
import styles from "./RegisterPage.module.css";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const { changeDocumentTitle } = useModules();

  const [loading, setLoading] = useState<boolean>(false);
  const [registeredRole, setRegisteredRole] = useState<ProfileRole>();

  const handleRegister = useCallback(async (values: RegisterPayload) => {
    setLoading(true);

    try {
      const response = await AuthService.register(values);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      setRegisteredRole(values.role);
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
    changeDocumentTitle(t("auth.pages.register"));
  }, [changeDocumentTitle, t]);

  return (
    <AuthCardContainer>
      {registeredRole ? (
        <Flex vertical gap={8}>
          <Flex align="center" vertical gap={4}>
            <Title level={3}>
              {t("auth.register.success")}
            </Title>

            <Text className={styles.successDescription}>
              {registeredRole === "therapist"
                ? t("auth.register.therapistSuccess.description")
                : t("auth.register.patientSuccess.description")}
            </Text>
          </Flex>

          <Divider />

          <Flex align="center" vertical>
            <Text
              className={styles.backToLogin}
              onClick={goBack}
            >
              {t("auth.register.backToLogin")}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex vertical gap={4}>
            <Flex align="center" gap={12}>
              <CommonBackButton onClick={goBack} />
              <Title level={3}>
                {t("auth.register.register")}
              </Title>
            </Flex>

            <Text>
              {t("auth.register.register.description")}
            </Text>
          </Flex>

          <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
          />
        </>
      )}
    </AuthCardContainer>
  );
};

export default RegisterPage;
