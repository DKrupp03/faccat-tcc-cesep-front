import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Divider } from "antd";
import dayjs from "dayjs";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import { usePatientForm } from "../../hooks/usePatientForm";
import type { AnamneseType } from "../../types/anamnese";
import { GeneralDataForm } from "./components/GeneralDataForm/GeneralDataForm";
import { IdentificationDataForm } from "./components/IdentificationDataForm/IdentificationDataForm";
import { FamilyForm } from "./components/FamilyForm/FamilyForm";
import { ReasonForm } from "./components/ReasonForm/ReasonForm";
import { PreviousHistoryForm } from "./components/PreviousHistoryForm/PreviousHistoryForm";
import { DevelopmentForm } from "./components/DevelopmentForm/DevelopmentForm";
import { SchoolHistoryForm } from "./components/SchoolHistoryForm/SchoolHistoryForm";
import { OccupationHistoryForm } from "./components/OccupationHistoryForm/OccupationHistoryForm";
import { PubertyForm } from "./components/PubertyForm/PubertyForm";
import { AdulthoodForm } from "./components/AdulthoodForm/AdulthoodForm";
import { MatureAgeForm } from "./components/MatureAgeForm/MatureAgeForm";
import { ClinicalHistoryForm } from "./components/ClinicalHistoryForm/ClinicalHistoryForm";
import { CurrentMomentForm } from "./components/CurrentMomentForm/CurrentMomentForm";
import { FamilyHistoryForm } from "./components/FamilyHistoryForm/FamilyHistoryForm";
import { DomesticEnvironmentForm } from "./components/DomesticEnvironmentForm/DomesticEnvironmentForm";
import { SocialRelationsForm } from "./components/SocialRelationsForm/SocialRelationsForm";
import { AdolescentIssuesForm } from "./components/AdolescentIssuesForm/AdolescentIssuesForm";
import { WeeklyRoutineForm } from "./components/WeeklyRoutineForm/WeeklyRoutineForm";
import { ForInterviewerForm } from "./components/ForInterviewerForm/ForInterviewerForm";
import styles from "./PatientAnamneseForm.module.css";

export const PatientAnamneseForm = () => {
  const { patient } = usePatientForm();

  const [form] = Form.useForm<Partial<AnamneseType>>();
  const anamneseType = Form.useWatch("anamnese_type", form);

  useEffect(() => {
    if (patient?.anamnese) {
      form.setFieldsValue(patient.anamnese);
    } else {
      form.resetFields();
    }
  }, [patient?.anamnese]);

  return (
    <Form
      id="anamnese-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={() => {}}
      initialValues={{
        anamnese_type: "child",
        patient_id: patient?.id,
        therapist_id: patient?.therapist_id,
        created_at: new Date().toISOString(),
        anamnese_data: {
          identificationData: {
            name: patient?.name,
            birth: patient?.birth,
            age: patient?.birth ? String(dayjs().diff(dayjs(patient.birth), "year")) : undefined,
            gender: patient?.gender,
            educationLevel: patient?.education_level,
            maritalStatus: patient?.marital_status,
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

          <SchoolHistoryForm />
          <Divider />

          {anamneseType === "adolescent" && (
            <>
              <OccupationHistoryForm />
              <Divider />
            </>
          )}

          <ClinicalHistoryForm />
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

      <CurrentMomentForm />
      <Divider />

      {anamneseType !== "adult" && (
        <>
          <FamilyHistoryForm />
          <Divider />

          <DomesticEnvironmentForm />
          <Divider />
        </>
      )}

      {anamneseType === "adolescent" && (
        <>
          <SocialRelationsForm />
          <Divider />

          <AdolescentIssuesForm />
          <Divider />
        </>
      )}

      <WeeklyRoutineForm />
      <Divider />

      <ForInterviewerForm />
      <Divider />
    </Form>
  );
};

export const PatientAnamneseFormOptions = () => {
  const { t } = useTranslation();

  return (
    <>
      <CommonButton
        htmlType="submit"
        form="anamnese-form"
        buttonVariant="primary"
      >
        {t("common.actions.save")}
      </CommonButton>
    </>
  );
};
