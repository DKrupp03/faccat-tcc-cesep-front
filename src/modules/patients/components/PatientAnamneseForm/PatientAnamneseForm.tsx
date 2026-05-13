import { useTranslation } from "react-i18next";
import { Form, Divider } from "antd";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import { usePatientAnamnese } from "../../hooks/usePatientAnamnese";
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
  const {
    form,
    anamneseType,
    initialAnamnese,
    handleSubmitAnamnese,
  } = usePatientAnamnese();

  return (
    <Form
      id="anamnese-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmitAnamnese}
      initialValues={initialAnamnese}
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
  const { isSubmitting } = usePatientAnamnese();

  return (
    <>
      <CommonButton
        htmlType="submit"
        form="anamnese-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {t("patients.anamnese.actions.save")}
      </CommonButton>
    </>
  );
};
