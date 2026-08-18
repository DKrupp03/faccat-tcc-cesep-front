import { useCallback } from "react";
import { Form, Row, Col } from "antd";
import dayjs from "dayjs";
import { IconMail, IconUser } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { getGenderOptions } from "@/modules/therapists/utils/form";

import type { RegisterPayload } from "../../types/auth";

import styles from "./RegisterForm.module.css";

type RegisterFormProps = {
  onSubmit: (values: RegisterPayload) => Promise<void>;
  loading: boolean;
};

export const RegisterForm = ({
  onSubmit,
  loading,
}: RegisterFormProps) => {
  const { t } = useTranslation();

  const genderOptions = getGenderOptions(t);

  const handleSubmit = useCallback(async (values: RegisterPayload) => {
    await onSubmit(values);
  }, [onSubmit]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
      initialValues={{ role: "patient" }}
      className={styles.form}
    >
      <Form.Item name="role">
        <CommonGroupButtons label={t("auth.register.accountType")}>
          <CommonGroupButtons.Button value="patient">
            {t("common.roles.patient")}
          </CommonGroupButtons.Button>
          <CommonGroupButtons.Button value="therapist">
            {t("common.roles.therapist")}
          </CommonGroupButtons.Button>
        </CommonGroupButtons>
      </Form.Item>

      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: t("auth.register.insertName"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconUser size={16} />}
          label={t("auth.register.name")}
          required
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t("auth.insertEmail"),
          },
          {
            type: "email",
            message: t("auth.register.invalidEmail"),
          },
        ]}
      >
        <CommonTextInput
          icon={<IconMail size={16} />}
          label={t("auth.email")}
          required
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: t("auth.register.insertGender"),
              },
            ]}
          >
            <CommonSelect
              label={t("auth.register.gender")}
              options={genderOptions}
              required
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="birth"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
            rules={[
              {
                required: true,
                message: t("auth.register.insertBirth"),
              },
            ]}
          >
            <CommonDatePicker label={t("auth.register.birth")} required />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className={styles.submit}>
        <CommonButton
          buttonVariant="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          {t("auth.register.submit")}
        </CommonButton>
      </Form.Item>
    </Form>
  );
};
