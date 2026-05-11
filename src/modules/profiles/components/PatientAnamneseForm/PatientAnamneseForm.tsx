import { useEffect } from "react";
import { Form } from "antd";

import { useProfileForm } from "../../hooks/useProfileForm";
import type { AnamneseType } from "../../types/anamnese";
import { GeneralDataForm } from "./components/GeneralDataForm/GeneralDataForm";
import styles from "./PatientAnamneseForm.module.css";

export const PatientAnamneseForm = () => {
  const [form] = Form.useForm<Partial<AnamneseType>>();
  const { profile } = useProfileForm();

  useEffect(() => {
    if (profile?.anamnese) {
      form.setFieldsValue(profile.anamnese);
    } else {
      form.resetFields();
    }
  }, [profile?.anamnese]);

  return (
    <Form
      id="anamnese-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={() => {}}
      initialValues={{
        anamnese_type: "child",
        patient_id: profile?.id,
        therapist_id: profile?.therapist_id,
        created_at: new Date().toISOString(),
      }}
      className={styles.form}
    >
      <GeneralDataForm />
    </Form>
  );
};

