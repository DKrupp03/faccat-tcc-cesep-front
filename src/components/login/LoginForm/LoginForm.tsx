import { useCallback, useState } from "react";
import { Form } from "antd";
import { IconMail, IconLock } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { CommonTextInput } from "../../common/CommonTextInput/CommonTextInput";
import { CommonButton } from "../../common/CommonButton/CommonButton";
import { useAuth } from "../../../contexts/AuthContext";
import { colors } from "../../../theme";

export function LoginForm() {
  const { login } = useAuth();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (values: { email: string; password: string }) => {
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
      <Form.Item name="email">
        <CommonTextInput
          icon={<IconMail size={16} />}
          label={t("login.email")}
        />
      </Form.Item>

      <Form.Item name="password">
        <CommonTextInput
          icon={<IconLock size={16} />}
          label={t("login.password")}
          password
        />
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -8 }}>
        <a href="#" style={{ color: colors.gray[300], fontSize: 14 }}>
          {t("login.forgotPassword")}
        </a>
      </div>

      <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
        <CommonButton
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
          style={{ borderRadius: 8, height: 44 }}
        >
          {t("login.submit")}
        </CommonButton>
      </Form.Item>
    </Form>
  );
}
