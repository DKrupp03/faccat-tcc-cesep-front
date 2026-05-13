import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "antd";
import dayjs from "dayjs";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";

import { useMedicalRecordsFilter } from "../../hooks/useMedicalRecordsFilter";
import styles from "./MedicalRecordsFilterModal.module.css";

export const MedicalRecordsFilterModal = () => {
  const { t } = useTranslation();
  const {
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  } = useMedicalRecordsFilter();

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
      title={t("patients.medicalRecords.actions.filtrate")}
      isOpen={isFilterOpen}
      close={handleClose}
      footer={footerContent}
    >
      <Form
        form={form}
        name="medical-records-filter"
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
              <CommonDatePicker label={t("patients.medicalRecords.filter.dateStart")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date_end"
              noStyle
              getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
            >
              <CommonDatePicker label={t("patients.medicalRecords.filter.dateEnd")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CommonModal>
  );
};
