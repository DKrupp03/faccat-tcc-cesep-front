import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Flex } from "antd";
import type { DefaultOptionType } from 'antd/es/select';

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";

import { useProfilesStates } from "../../hooks/useProfilesStates";
import { useProfilesOperations } from "../../hooks/useProfilesOperations";
import type { ProfilesFilter } from "../../types/profile";
import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import styles from "./ProfilesFilterModal.module.css";

type ProfilesFilterModalProps = {
  module: ModuleKey;
  isOpen: boolean;
  close: () => void;
  filtrate: (newFilter: ProfilesFilter) => void;
  filter: ProfilesFilter;
};

export const ProfilesFilterModal = ({
  module,
  isOpen,
  close,
  filtrate,
  filter,
}: ProfilesFilterModalProps) => {
  const { t } = useTranslation();
  const { defaultFilter } = useProfilesStates({ module });
  const { fetchProfiles } = useProfilesOperations();

  const [form] = Form.useForm();

  const [profilesOptions, setProfilesOptions] = useState<DefaultOptionType[]>([]);

  const paymentStatusOptions = useMemo(() => ([
    { label: t("common.all"), value: "all" },
    { label: t("payments.status.paid"), value: "paid" },
    { label: t("payments.status.unpaid"), value: "unpaid" },
    { label: t("payments.status.overdue"), value: "overdue" },
  ]), [t]);

  const handleClear = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleFiltrate = useCallback(() => {
    const values = form.getFieldsValue(true);
    filtrate(values);
    close();
  }, [form, filtrate, close]);
  
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  const footerContent = useMemo(() => (
    <>
      <CommonButton
        onClick={handleClose}
        outline
      >
        {t("common.actions.close")}
      </CommonButton>
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
  ), [t, handleClose, handleClear, handleFiltrate]);

  const getProfiles = useCallback(async () => {
    const response = await fetchProfiles({
      active: 1,
      role: module === "patients" ? "therapist" : "patient",
    }, "name_asc");

    if (response.success) {
      setProfilesOptions(
        response.profiles.map((p) => (
          { label: p.name, value: p.id }
        ))
      );
    }
  }, [module, fetchProfiles]);

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(filter);
      getProfiles();
    }
  }, [isOpen]);

  return (
    <CommonModal
      title={t(`profiles.${module}.actions.filtrate`)}
      isOpen={isOpen}
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
              <CommonSelect
                label={module === "patients"
                  ? t("profiles.columns.therapist")
                  : t("profiles.columns.patient")}
                options={profilesOptions}
                allowClear
              />
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
