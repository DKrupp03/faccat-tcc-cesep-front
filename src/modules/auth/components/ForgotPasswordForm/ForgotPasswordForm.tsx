import { useCallback } from "react";
import { Form } from "antd";
import { IconMail } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import styles from "./ForgotPasswordForm.module.css";

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
      className={styles.form}
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
        <CommonButton
          buttonVariant="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          {t("auth.forgotPassword.resetPassword")}
        </CommonButton>
      </Form.Item>
    </Form>
  );
};
