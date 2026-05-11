import { Form, Skeleton, Divider } from "antd";
import { useTranslation } from "react-i18next";


import { useProfileForm } from "../../hooks/useProfileForm";
import type{ AnamneseDataType } from "../../types/anamnese";
import styles from "./PatientAnamneseForm.module.css";

export const PatientAnamneseForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<Partial<AnamneseDataType>>();
  const {
    loadingProfile,
  } = useProfileForm();

  if (loadingProfile) {
    return (
      <Skeleton
        className={styles.form}
        paragraph={{ rows: 8 }}
        active
      />
    );
  }

  return (
    <Form
      id="anamnese-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={() => {}}
      initialValues={{}}
      className={styles.form}
    >
      anamnese
    </Form>
  );
};

