import { useCallback } from "react";
import { Form } from "antd";
import { IconMail } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

type ForgotPasswordFormProps = {
  onSubmit: (email: string) => Promise<void>;
  loading: boolean;
};

export const ForgotPasswordForm = ({
  onSubmit,
  loading,
}: ForgotPasswordFormProps) => {
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
            message: t("auth.insertEmail"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconMail size={16} />}
          label={t("auth.email")}
        />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
          <CommonButton
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            style={{ height: 44 }}
          >
            {t("auth.forgotPassword.resetPassword")}
          </CommonButton>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
