import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "antd";
import dayjs from "dayjs";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { useServicesFilter } from "../../hooks/useServicesFilter";
import { useServicesList } from "../../hooks/useServicesList";
import { getServiceTypeOptions, getStatusOptions } from "../../utils/form";
import styles from "./ServicesFilterModal.module.css";

export const ServicesFilterModal = () => {
  const { t } = useTranslation();
  const { therapistId } = useServicesList();
  const {
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  } = useServicesFilter();

  const serviceTypeOptions = useMemo(() => getServiceTypeOptions(t), [t]);
  const statusOptions = useMemo(() => getStatusOptions(t), [t]);

  const footerContent = useMemo(() => (
    <>
      <CommonButton onClick={handleClear} outline>
        {t("common.actions.clearFilter")}
      </CommonButton>
      <CommonButton onClick={handleFiltrate} buttonVariant="primary">
        {t("common.actions.filtrate")}
      </CommonButton>
    </>
  ), [t, handleClear, handleFiltrate]);

  return (
    <CommonModal
      title={t("services.actions.filtrate")}
      isOpen={isFilterOpen}
      close={handleClose}
      footer={footerContent}
    >
      <Form
        form={form}
        name="services-filter"
        initialValues={defaultFilter}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date_start"
              noStyle
              getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
            >
              <CommonDatePicker
                label={t("services.filter.dateStart")}
                showTime={{ format: "HH:mm" }}
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date_end"
              noStyle
              getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
            >
              <CommonDatePicker
                label={t("services.filter.dateEnd")}
                showTime={{ format: "HH:mm" }}
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="patient_id" noStyle>
              <ProfilesSelect role="patient" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="therapist_id" noStyle>
              <ProfilesSelect
                role="therapist"
                disabled={!!therapistId}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="service_type" noStyle>
              <CommonSelect
                label={t("services.columns.serviceType")}
                options={serviceTypeOptions}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" noStyle>
              <CommonSelect
                label={t("services.columns.status")}
                options={statusOptions}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CommonModal>
  );
};
