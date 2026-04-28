import { useEffect, useMemo } from "react";
import { Form, Row, Col, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { phoneMask, cpfMask, rgMask, crpMask, decimalMask } from "@/shared/utils/formatters";

import { useProfiles } from "../../hooks/useProfiles";
import type { Profile } from "../../types/profile";
import { ProfilesSelect } from "../ProfilesSelect/ProfilesSelect";
import styles from "./ProfileForm.module.css";

export const ProfileForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<Partial<Profile>>();
  const {
    isFormOpen,
    editingRole,
    profile,
    submitProfile,
  } = useProfiles();

  const defaultProfile = useMemo(() => ({
    role: editingRole,
    active: true,
  }), [editingRole]);

  const genderOptions = useMemo(() => ([
    { value: "male", label: t("profiles.genders.male") },
    { value: "female", label: t("profiles.genders.female") },
    { value: "other", label: t("profiles.genders.other") },
  ]), [t]);

  const maritalStatusOptions = useMemo(() => ([
    { value: "single", label: t("profiles.maritalStatus.single") },
    { value: "married", label: t("profiles.maritalStatus.married") },
    { value: "divorced", label: t("profiles.maritalStatus.divorced") },
    { value: "widowed", label: t("profiles.maritalStatus.widowed") },
  ]), [t]);

  const educationLevelOptions = useMemo(() => ([
    { value: "elementary_incomplete", label: t("profiles.educationLevels.elementaryIncomplete") },
    { value: "elementary_complete", label: t("profiles.educationLevels.elementaryComplete") },
    { value: "high_school_incomplete", label: t("profiles.educationLevels.highSchoolIncomplete") },
    { value: "high_school_complete", label: t("profiles.educationLevels.highSchoolComplete") },
    { value: "technical", label: t("profiles.educationLevels.technical") },
    { value: "higher_education_incomplete", label: t("profiles.educationLevels.higherEducationIncomplete") },
    { value: "higher_education_complete", label: t("profiles.educationLevels.higherEducationComplete") },
    { value: "postgraduate", label: t("profiles.educationLevels.postgraduate") },
    { value: "masters", label: t("profiles.educationLevels.masters") },
    { value: "doctorate", label: t("profiles.educationLevels.doctorate") },
  ]), [t]);

  useEffect(() => {
    if (isFormOpen) {
      if (profile) {
        form.setFieldsValue(profile);
      } else {
        form.setFieldsValue(defaultProfile);
      }
    }
  }, [isFormOpen, profile]);

  return (
    <Form
      id="profile-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={submitProfile}
      className={styles.form}
    >
      <Flex
        justify="center" align="center" gap={10}
        className={styles.avatarContainer}
      >
        <CommonAvatar
          size={60}
          circular
        />
        <CommonButton
          onClick={() => {}}
          icon={<IconUpload size={18} />}
          buttonVariant="primary"
          circular
        />
        <CommonButton
          onClick={() => {}}
          icon={<IconTrash size={18} />}
          buttonVariant="danger"
          circular
        />
      </Flex>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name">
            <CommonTextInput
              label={t("profiles.columns.name")}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email">
            <CommonTextInput
              label={t("profiles.columns.email")}
              disabled={!!profile?.id}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="gender">
            <CommonSelect
              label={t("profiles.columns.gender")}
              options={genderOptions}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="birth">
            <CommonDatePicker
              label={t("profiles.columns.birth")}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="phone" normalize={phoneMask}>
            <CommonTextInput label={t("profiles.columns.phone")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address">
            <CommonTextInput label={t("profiles.columns.address")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {editingRole !== "patient" && (  
          <Col span={12}>
            <Form.Item name="crp" normalize={crpMask}>
              <CommonTextInput label={t("profiles.columns.crp")} />
            </Form.Item>
          </Col>
        )}
        <Col span={editingRole === "patient" ? 12 : 6}>
          <Form.Item name="cpf" normalize={cpfMask}>
            <CommonTextInput label={t("profiles.columns.cpf")} />
          </Form.Item>
        </Col>
        <Col span={editingRole === "patient" ? 12 : 6}>
          <Form.Item name="rg" normalize={rgMask}>
            <CommonTextInput label={t("profiles.columns.rg")} />
          </Form.Item>
        </Col>
      </Row>

      {editingRole === "patient" && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="marital_status">
                <CommonSelect
                  label={t("profiles.columns.maritalStatus")}
                  options={maritalStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="education_level">
                <CommonSelect
                  label={t("profiles.columns.educationLevel")}
                  options={educationLevelOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="occupation">
                <CommonTextInput label={t("profiles.columns.occupation")} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="therapist_id">
                <ProfilesSelect
                  role="therapist"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="default_value" normalize={decimalMask}>
                <CommonTextInput label={t("profiles.columns.defaultValue")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="extra">
                <CommonTextArea label={t("profiles.columns.extra")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="active">
                <CommonSwitch label={t("common.active")} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

export const ProfileFormOptions = () => {
  const { t } = useTranslation();
  const {
    profile,
    isSubmitting,
  } = useProfiles();

  return (
    <>
      {profile?.id && (
        <CommonButton
          onClick={() => {}}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="profile-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {profile?.id
          ? t("common.actions.edit")
          : t("common.actions.create")}
      </CommonButton>
    </>
  );
};