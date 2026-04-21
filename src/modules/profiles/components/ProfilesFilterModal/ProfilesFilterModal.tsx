import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "antd";
import type { DefaultOptionType } from 'antd/es/select';

import { useModules } from "@/shared/hooks/useModules";
import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";

import { useProfiles } from "../../hooks/useProfiles";
import { useProfilesCommon } from "../../hooks/useProfilesCommon";
import type { ProfilesFilter } from "../../types/profile";
import styles from "./ProfilesFilterModal.module.css";

type ProfilesFilterModalProps = {
  isOpen: boolean;
  close: () => void;
};

export const ProfilesFilterModal = ({
  isOpen,
  close,
}: ProfilesFilterModalProps) => {
  const { t } = useTranslation();
  const { activeModule } = useModules();
  const { fetchProfiles } = useProfilesCommon();
  const {
    profileRole,
    filtratePanel,
    filter,
    orderBy,
  } = useProfiles();

  const [form] = Form.useForm();

  const [profilesOptions, setProfilesOptions] = useState<DefaultOptionType[]>([]);

  const defaultFilter: ProfilesFilter = useMemo(() => ({
    active: true,
    role: profileRole,
  }), [profileRole]);

  const handleClear = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleFiltrate = useCallback(() => {
    const values = form.getFieldsValue();
    filtratePanel(values, orderBy, 1);
    close();
  }, [form, filtratePanel, orderBy, close]);
  
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  const footerContent = useMemo(() => (
    <>
      <CommonButton
        onClick={handleClose}
        outline
        size="large"
      >
        {t("common.actions.close")}
      </CommonButton>
      <CommonButton
        onClick={handleClear}
        outline
        size="large"
      >
        {t("common.actions.clearFilter")}
      </CommonButton>
      <CommonButton
        onClick={handleFiltrate}
        buttonVariant="primary"
        size="large"
      >
        {t("common.actions.filtrate")}
      </CommonButton>
    </>
  ), [t, handleClose, handleClear, handleFiltrate]);

  const getProfiles = useCallback(async () => {
    const response = await fetchProfiles({
      active: true,
      role: activeModule === "patients" ? "therapist" : "patient",
    }, "name_asc");

    if (response.success) {
      setProfilesOptions(
        response.profiles.map((p) => (
          { label: p.name, value: p.id }
        ))
      );
    }
  }, [activeModule, fetchProfiles]);

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(filter);
      getProfiles();
    }
  }, [isOpen]);

  return (
    <CommonModal
      title={t(`profiles.${activeModule}.actions.filtrate`)}
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
            <Form.Item
              name={activeModule === "patients"
                ? "therapist_id"
                : "patient_id"}
              noStyle
            >
              <CommonSelect
                label={activeModule === "patients"
                  ? t("profiles.columns.therapist")
                  : t("profiles.columns.patient")}
                options={profilesOptions}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="name" noStyle>
              <CommonTextInput label={t("profiles.columns.name")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CommonModal>
  );
};
