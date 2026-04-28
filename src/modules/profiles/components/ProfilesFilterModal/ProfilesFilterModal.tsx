import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Flex } from "antd";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";

import { useProfiles } from "../../hooks/useProfiles";
import { ProfilesSelect } from "../ProfilesSelect/ProfilesSelect";
import styles from "./ProfilesFilterModal.module.css";

export const ProfilesFilterModal = () => {
  const { t } = useTranslation();
  const {
    module,
    isFilterOpen,
    setIsFilterOpen,
    filtratePanel,
    filter,
    defaultFilter,
  } = useProfiles();

  const [form] = Form.useForm();

  const paymentStatusOptions = useMemo(() => ([
    { label: t("common.all"), value: "all" },
    { label: t("payments.status.paid"), value: "paid" },
    { label: t("payments.status.unpaid"), value: "unpaid" },
    { label: t("payments.status.overdue"), value: "overdue" },
  ]), [t]);

  const handleClear = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleClose = useCallback(() => {
    setIsFilterOpen(false);
  }, [setIsFilterOpen]);

  const handleFiltrate = useCallback(() => {
    const values = form.getFieldsValue(true);
    filtratePanel(values);
    handleClose();
  }, [form, filtratePanel, handleClose]);

  const footerContent = useMemo(() => (
    <>
      <CommonButton
        onClick={handleClear}
        outline
      >
        {t("common.actions.clearFilter")}
      </CommonButton>
      <CommonButton
        onClick={handleFiltrate}
        buttonVariant="primary"
      >
        {t("common.actions.filtrate")}
      </CommonButton>
    </>
  ), [t, handleClear, handleFiltrate]);

  useEffect(() => {
    if (isFilterOpen) {
      form.setFieldsValue(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterOpen]);

  return (
    <CommonModal
      title={t(`profiles.${module}.actions.filtrate`)}
      isOpen={isFilterOpen}
      close={handleClose}
      footer={footerContent}
    >
      <Form
        form={form}
        name="profiles-filter"
        initialValues={defaultFilter}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="name" noStyle>
              <CommonTextInput label={t("profiles.columns.name")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={module === "patients" ? 12 : 24}>
            <Form.Item
              name={module === "patients" ? "therapist_id" : "patient_id"}
              noStyle
            >
              <ProfilesSelect role={module === "patients" ? "therapist" : "patient"} />
            </Form.Item>
          </Col>
          {module === "patients" && (
            <Col span={12}>
              <Form.Item name="payment_status" noStyle>
                <CommonSelect
                  label={t("profiles.columns.paymentStatus")}
                  options={paymentStatusOptions}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Flex justify="start">
              <Form.Item name="active" noStyle>
                <CommonGroupButtons>
                  <CommonGroupButtons.Button value={1}>
                    {t("profiles.columns.active.active")}
                  </CommonGroupButtons.Button>
                  <CommonGroupButtons.Button value={0}>
                    {t("profiles.columns.active.inactive")}
                  </CommonGroupButtons.Button>
                  <CommonGroupButtons.Button value={-1}>
                    {t("profiles.columns.active.all")}
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
