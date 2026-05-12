import { useEffect } from "react";
import { Form, Divider } from "antd";
import dayjs from "dayjs";

import { useProfileForm } from "../../hooks/useProfileForm";
import type { AnamneseType } from "../../types/anamnese";
import { GeneralDataForm } from "./components/GeneralDataForm/GeneralDataForm";
import { IdentificationDataForm } from "./components/IdentificationDataForm/IdentificationDataForm";
import { FamilyForm } from "./components/FamilyForm/FamilyForm";
import { ReasonForm } from "./components/ReasonForm/ReasonForm";
import { PreviousHistoryForm } from "./components/PreviousHistoryForm/PreviousHistoryForm";
import { DevelopmentForm } from "./components/DevelopmentForm/DevelopmentForm";
import { PubertyForm } from "./components/PubertyForm/PubertyForm";
import { AdulthoodForm } from "./components/AdulthoodForm/AdulthoodForm";
import { MatureAgeForm } from "./components/MatureAgeForm/MatureAgeForm";
import styles from "./PatientAnamneseForm.module.css";

export const PatientAnamneseForm = () => {
  const { profile } = useProfileForm();

  const [form] = Form.useForm<Partial<AnamneseType>>();
  const anamneseType = Form.useWatch("anamnese_type", form);

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

      <ReasonForm />
      <Divider />

      <PreviousHistoryForm />
      <Divider />

      {anamneseType !== "adult" && (
        <>
          <DevelopmentForm />
          <Divider />
        </>
      )}

      {anamneseType === "adult" && (
        <>
          <PubertyForm />
          <Divider />

          <AdulthoodForm />
          <Divider />

          <MatureAgeForm />
          <Divider />
        </>
      )}
    </Form>
  );
};

