import { useCallback } from "react";
import { Form } from "antd";
import { IconMail } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

type ForgotPasswordFormProps = {
  onSubmit: (email: string) => Promise<void>;
};

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();

  const handleSubmit = useCallback(async (values: { email: string }) => {
    await onSubmit(values.email);
  }, [onSubmit]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t("login.insertEmail"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconMail size={16} />}
          label={t("login.email")}
        />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
          <CommonButton
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ height: 44 }}
          >
            {t("forgotPassword.resetPassword")}
          </CommonButton>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
