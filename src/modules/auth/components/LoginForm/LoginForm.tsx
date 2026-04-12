import { useCallback, useState } from "react";
import { Form, Flex } from "antd";
import { IconMail, IconLock } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { COLORS } from "@/shared/theme";
import { PATHS } from "@/routes/paths";

import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (values: { email: string; password: string; }) => {
    setLoading(true);

    try {
      await login(values.email, values.password);
    } finally {
      setLoading(false);
    }
  }, [login]);

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

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("auth.insertPassword"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconLock size={16} />}
          label={t("auth.password")}
          password
        />
      </Form.Item>

      <Flex justify="flex-end" style={{ marginTop: -8 }}>
        <Link to={PATHS.forgotPassword} style={{ color: COLORS.gray[300], fontSize: 14 }}>
          {t("auth.forgotPassword.forgotPassword")}
        </Link>
      </Flex>

      <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
        <CommonButton
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
          style={{ borderRadius: 8, height: 44 }}
        >
          {t("auth.login.submit")}
        </CommonButton>
      </Form.Item>
    </Form>
  );
}
