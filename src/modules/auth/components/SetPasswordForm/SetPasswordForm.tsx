import { useCallback, useState } from "react";
import { Form } from "antd";
import { IconLock } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { useNotification } from "@/shared/hooks/useNotification";
import { PATHS } from "@/routes/paths";
import { AuthService } from "../../services/AuthService";

import styles from "./SetPasswordForm.module.css";

type SetPasswordFormProps = {
  token: string;
};

export const SetPasswordForm = ({ token }: SetPasswordFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSetPassword = useCallback(async (
    values: { password: string; password_confirmation: string; }
  ) => {
    setLoading(true);

    try {
      const response = await AuthService.resetPassword(
        values.password,
        values.password_confirmation,
        token,
      );

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      openNotification(
        "success",
        t("auth.setPassword.success"),
      );

      navigate(PATHS.login, { replace: true });
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
    }
  }, [t, token, openNotification, navigate]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSetPassword}
      requiredMark={false}
      className={styles.form}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("auth.setPassword.insertNewPassword"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconLock size={16} />}
          label={t("auth.password")}
          password
        />
      </Form.Item>

      <Form.Item
        name="password_confirmation"
        rules={[
          {
            required: true,
            message: t("auth.setPassword.insertPasswordConfirmation"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconLock size={16} />}
          label={t("auth.setPassword.passwordConfirmation")}
          password
        />
      </Form.Item>

      <Form.Item className={styles.submit}>
        <CommonButton
          buttonVariant="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          {t("auth.setPassword.setPassword")}
        </CommonButton>
      </Form.Item>
    </Form>
  );
};
