import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Skeleton } from "antd";
import dayjs from "dayjs";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { useServiceForm } from "../../hooks/useServiceForm";
import { getServiceTypeOptions, getStatusOptions } from "../../utils/form";
import type { Service } from "../../types/service";
import styles from "./ServiceForm.module.css";

export const ServiceForm = () => {
  const { t } = useTranslation();
  const {
    isFormOpen,
    service,
    loadingService,
    submitService,
    therapistId,
    patientId,
  } = useServiceForm();

  const [form] = Form.useForm<Partial<Service>>();

  const serviceTypeOptions = useMemo(() => getServiceTypeOptions(t), [t]);
  const statusOptions = useMemo(() => getStatusOptions(t), [t]);

  useEffect(() => {
    if (isFormOpen) {
      if (service) {
        form.setFieldsValue(service);
      } else {
        form.resetFields();
      }
    }
  }, [isFormOpen, service, form]);

  if (loadingService) {
    return (
      <Skeleton
        className={styles.form}
        paragraph={{ rows: 6 }}
        active
      />
    );
  }

  return (
    <Form
      id="service-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={submitService}
      initialValues={{
        status: "scheduled",
        therapist_id: therapistId,
        patient_id: patientId,
      }}
      className={styles.form}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="patient_id">
            <ProfilesSelect
              role="patient"
              therapistId={therapistId}
              selectedProfile={service?.patient}
              disabled={!!patientId}
              allowClear={false}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="therapist_id">
            <ProfilesSelect
              role="therapist"
              selectedProfile={service?.therapist}
              disabled={!!therapistId}
              allowClear={false}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="service_type">
            <CommonSelect
              label={t("services.columns.serviceType")}
              options={serviceTypeOptions}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="status">
            <CommonSelect
              label={t("services.columns.status")}
              options={statusOptions}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="datetime_start"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          >
            <CommonDatePicker
              label={t("services.columns.datetimeStart")}
              showTime={{ format: "HH:mm" }}
              format="DD/MM/YYYY HH:mm"
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="datetime_end"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          >
            <CommonDatePicker
              label={t("services.columns.datetimeEnd")}
              showTime={{ format: "HH:mm" }}
              format="DD/MM/YYYY HH:mm"
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="observations">
            <CommonTextArea
              label={t("services.columns.observations")}
              rows={4}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export const ServiceFormOptions = () => {
  const { t } = useTranslation();
  const { service, isSubmitting, deleteService } = useServiceForm();

  return (
    <>
      {service?.id && (
        <CommonButton
          onClick={() => deleteService(service.id)}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="service-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {service?.id
          ? t("services.actions.edit")
          : t("services.actions.create")}
      </CommonButton>
    </>
  );
};
