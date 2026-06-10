import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Flex } from "antd";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { usePatientsFilter } from "../../hooks/usePatientsFilter";
import { usePatientsList } from "../../hooks/usePatientsList";
import styles from "./PatientsFilterModal.module.css";

export const PatientsFilterModal = () => {
  const { t } = useTranslation();
  const { therapistId } = usePatientsList();
  const {
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  } = usePatientsFilter();

  const paymentStatusOptions = useMemo(() => ([
    { label: t("common.all"), value: "all" },
    { label: t("payments.status.paid"), value: "paid" },
    { label: t("payments.status.unpaid"), value: "unpaid" },
    { label: t("payments.status.overdue"), value: "overdue" },
  ]), [t]);

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
      title={t("patients.actions.filtrate")}
      isOpen={isFilterOpen}
      close={handleClose}
      footer={footerContent}
    >
      <Form
        form={form}
        name="patients-filter"
        initialValues={defaultFilter}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="name" noStyle>
              <CommonTextInput label={t("patients.columns.name")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="therapist_id" noStyle>
              <ProfilesSelect
                role="therapist"
                disabled={!!therapistId}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="payment_status" noStyle>
              <CommonSelect
                label={t("patients.columns.paymentStatus")}
                options={paymentStatusOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Flex justify="start">
              <Form.Item name="active" noStyle>
                <CommonGroupButtons>
                  <CommonGroupButtons.Button value={1}>
                    {t("common.active.active")}
                  </CommonGroupButtons.Button>
                  <CommonGroupButtons.Button value={0}>
                    {t("common.active.inactive")}
                  </CommonGroupButtons.Button>
                  <CommonGroupButtons.Button value={-1}>
                    {t("common.active.all")}
                  </CommonGroupButtons.Button>
                </CommonGroupButtons>
              </Form.Item>
            </Flex>
          </Col>
        </Row>
      </Form>
    </CommonModal>
  );
};
