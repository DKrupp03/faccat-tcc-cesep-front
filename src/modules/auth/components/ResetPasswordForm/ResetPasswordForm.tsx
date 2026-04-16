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

type ResetPasswordFormProps = {
  token: string;
};

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = useCallback(async (
    values: { password: string; password_confirmation: string; }
  ) => {
    setLoading(true);

    try {
      const response = await AuthService.resetPassword(
        values.password,
        values.password_confirmation,
        token,
      );

      if (response.success) {
        openNotification(
          "success",
          t("auth.resetPassword.success"),
        );

        navigate(PATHS.login, { replace: true });
      } else {
        openNotification("error", response.errors!);
      }
    } finally {
      setLoading(false);
    }
  }, [t, token, openNotification, navigate]);

  return (
    <Form
      layout="vertical"
      onFinish={handleResetPassword}
      requiredMark={false}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("auth.resetPassword.insertNewPassword"),
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
            message: t("auth.resetPassword.insertPasswordConfirmation"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconLock size={16} />}
          label={t("auth.resetPassword.passwordConfirmation")}
          password
        />
      </Form.Item>

      <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
        <CommonButton
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
          style={{ borderRadius: 8, height: 44 }}
        >
          {t("auth.resetPassword.resetPassword")}
        </CommonButton>
      </Form.Item>
    </Form>
  );
};
