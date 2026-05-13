import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Skeleton } from "antd";
import dayjs from "dayjs";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import type { MedicalRecordType } from "../../types/medicalRecord";
import styles from "./MedicalRecordForm.module.css";

export const MedicalRecordForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<Partial<MedicalRecordType>>();
  const {
    isFormOpen,
    medicalRecord,
    loadingMedicalRecord,
    isSubmitting,
    submitMedicalRecord,
    deleteMedicalRecord,
    closeForm,
  } = useMedicalRecords();

  useEffect(() => {
    if (isFormOpen) {
      if (medicalRecord) {
        form.setFieldsValue(medicalRecord);
      } else {
        form.resetFields();
      }
    }
  }, [isFormOpen, medicalRecord, form]);

  const title = useMemo(() => (
    medicalRecord?.id
      ? t("patients.medicalRecords.actions.edit")
      : t("patients.medicalRecords.actions.create")
  ), [t, medicalRecord?.id]);

  const footer = useMemo(() => (
    <>
      {medicalRecord?.id && (
        <CommonButton
          onClick={() => deleteMedicalRecord(medicalRecord.id)}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="medical-record-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {medicalRecord?.id
          ? t("patients.medicalRecords.actions.edit")
          : t("patients.medicalRecords.actions.create")}
      </CommonButton>
    </>
  ), [t, medicalRecord, isSubmitting, deleteMedicalRecord]);

  return (
    <CommonDrawer
      title={title}
      isOpen={isFormOpen}
      close={closeForm}
      footer={footer}
      width="50%"
    >
      {loadingMedicalRecord ? (
        <Skeleton
          className={styles.form}
          paragraph={{ rows: 6 }}
          active
        />
      ) : (
        <Form
          id="medical-record-form"
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={submitMedicalRecord}
          className={styles.form}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title">
                <CommonTextInput
                  label={t("patients.medicalRecords.columns.title")}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
              >
                <CommonDatePicker
                  label={t("patients.medicalRecords.columns.date")}
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="service_id">
                <CommonTextInput
                  label={t("patients.medicalRecords.columns.service")}
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="observations">
                <CommonTextArea
                  label={t("patients.medicalRecords.columns.observations")}
                  required
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </CommonDrawer>
  );
};
