import { useEffect } from "react";
import { Form, Divider } from "antd";
import dayjs from "dayjs";

import { useProfileForm } from "../../hooks/useProfileForm";
import type { AnamneseType } from "../../types/anamnese";
import { GeneralDataForm } from "./components/GeneralDataForm/GeneralDataForm";
import { IdentificationDataForm } from "./components/IdentificationDataForm/IdentificationDataForm";
import { FamilyForm } from "./components/FamilyForm/FamilyForm";
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
        anamnese_data: {
          identificationData: {
            name: profile?.name,
            birth: profile?.birth,
            age: profile?.birth ? String(dayjs().diff(dayjs(profile.birth), "year")) : undefined,
            gender: profile?.gender,
            educationLevel: profile?.education_level,
            maritalStatus: profile?.marital_status,
          },
        },
      }}
      className={styles.form}
    >
      <GeneralDataForm />
      <Divider />

      <IdentificationDataForm />
      <Divider />

      <FamilyForm />
      <Divider />
    </Form>
  );
};

