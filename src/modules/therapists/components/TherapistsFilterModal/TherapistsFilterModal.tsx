import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Flex } from "antd";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { useTherapistsFilter } from "../../hooks/useTherapistsFilter";
import styles from "./TherapistsFilterModal.module.css";

export const TherapistsFilterModal = () => {
  const { t } = useTranslation();
  const {
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  } = useTherapistsFilter();

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
      title={t("therapists.actions.filtrate")}
      isOpen={isFilterOpen}
      close={handleClose}
      footer={footerContent}
    >
      <Form
        form={form}
        name="therapists-filter"
        initialValues={defaultFilter}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="name" noStyle>
              <CommonTextInput label={t("therapists.columns.name")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="patient_id" noStyle>
              <ProfilesSelect role="patient" />
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
