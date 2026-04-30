import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Flex } from "antd";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";

import { useProfilesFilter } from "../../hooks/useProfilesFilter";
import { ProfilesSelect } from "../ProfilesSelect/ProfilesSelect";
import styles from "./ProfilesFilterModal.module.css";

export const ProfilesFilterModal = () => {
  const { t } = useTranslation();
  const {
    module,
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  } = useProfilesFilter();

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
              <CommonTextInput label={t("common.columns.name")} />
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
                  label={t("common.columns.paymentStatus")}
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
