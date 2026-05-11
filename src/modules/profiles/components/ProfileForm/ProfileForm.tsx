import { useEffect, useMemo } from "react";
import { Form, Row, Col, Flex, Skeleton, Upload, Divider } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { IconTrash, IconUpload, IconUser } from "@tabler/icons-react";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { phoneMask, cpfMask, rgMask, crpMask, decimalMask } from "@/shared/utils/formatters";
import { COLORS } from "@/shared/theme";

import { useProfileForm } from "../../hooks/useProfileForm";
import { useProfilesForm } from "../../hooks/useProfilesForm";
import type { Profile } from "../../types/profile";
import { ProfilesSelect } from "../ProfilesSelect/ProfilesSelect";
import { getGenderOptions, getMaritalStatusOptions, getEducationLevelOptions } from "../../utils/form";
import styles from "./ProfileForm.module.css";

export const ProfileForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<Partial<Profile>>();
  const { therapistId } = useProfilesForm();
  const {
    isFormOpen,
    editingRole,
    profile,
    loadingProfile,
    setUploadedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  } = useProfileForm();

  const genderOptions = getGenderOptions(t);
  const maritalStatusOptions = getMaritalStatusOptions(t);
  const educationLevelOptions = getEducationLevelOptions(t);

  const regularTherapist = useMemo(() => (
    !profile?.id && editingRole === "patient" && !!therapistId
  ), [profile?.id, editingRole, therapistId]);

  useEffect(() => {
    if (isFormOpen) {
      if (profile) {
        form.setFieldsValue(profile);
      } else {
        form.resetFields();
      }
    }
  }, [isFormOpen, profile, form]);

  if (loadingProfile) {
    return (
      <Skeleton
        className={styles.form}
        paragraph={{ rows: 8 }}
        active
      />
    );
  }

  return (
    <Form
      id="profile-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit}
      initialValues={{
        role: editingRole,
        active: true,
        admin: false,
        ...(regularTherapist && { therapist_id: therapistId })
      }}
      className={styles.form}
    >
      <Flex
        justify="center" align="center" gap={10}
        className={styles.avatarContainer}
      >
        <CommonAvatar
          size={60}
          circular
          photoUrl={photoUrl}
        />
        <Upload
          showUploadList={false}
          accept="image/*"
          beforeUpload={(file) => {
            setChangedPhoto(true);
            setUploadedPhoto(file);
            return false;
          }}
        >
          <CommonButton
            onClick={() => {}}
            icon={<IconUpload size={18} />}
            buttonVariant="primary"
            circular
          />
        </Upload>
        <CommonButton
          onClick={() => {
            setChangedPhoto(true);
            setUploadedPhoto(undefined);
          }}
          icon={<IconTrash size={18} />}
          buttonVariant="danger"
          circular
        />
      </Flex>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name">
            <CommonTextInput
              label={t("common.columns.name")}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email">
            <CommonTextInput
              label={t("common.columns.email")}
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
              label={t("common.columns.gender")}
              options={genderOptions}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="birth"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
          >
            <CommonDatePicker
              label={t("common.columns.birth")}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="phone" normalize={phoneMask}>
            <CommonTextInput label={t("common.columns.phone")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address">
            <CommonTextInput label={t("common.columns.address")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {editingRole !== "patient" && (
          <Col span={12}>
            <Form.Item name="crp" normalize={crpMask}>
              <CommonTextInput label={t("common.columns.crp")} />
            </Form.Item>
          </Col>
        )}
        <Col span={editingRole === "patient" ? 12 : 6}>
          <Form.Item name="cpf" normalize={cpfMask}>
            <CommonTextInput label={t("common.columns.cpf")} />
          </Form.Item>
        </Col>
        <Col span={editingRole === "patient" ? 12 : 6}>
          <Form.Item name="rg" normalize={rgMask}>
            <CommonTextInput label={t("common.columns.rg")} />
          </Form.Item>
        </Col>
      </Row>

      {editingRole === "patient" && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="marital_status">
                <CommonSelect
                  label={t("common.columns.maritalStatus")}
                  options={maritalStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="education_level">
                <CommonSelect
                  label={t("common.columns.educationLevel")}
                  options={educationLevelOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="occupation">
                <CommonTextInput label={t("common.columns.occupation")} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="therapist_id">
                <ProfilesSelect
                  role="therapist"
                  showHelp
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="default_value" normalize={decimalMask}>
                <CommonTextInput
                  label={t("common.columns.defaultValue")}
                  icon={<CommonIconHelp text={t("profiles.help.defaultValue")} />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="extra">
                <CommonTextArea label={t("common.columns.extra")} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="active">
            <CommonSwitch
              label={t("common.columns.active")}
              disabled={!profile?.id}
              icon={<CommonIconHelp text={t(`profiles.help.active.${editingRole}s`)} />}
            />
          </Form.Item>
        </Col>
      </Row>

      {editingRole === "therapist" && (
        <Row gutter={16} className={styles.switch}>
          <Col span={6}>
            <Form.Item name="admin">
              <CommonSwitch
                label={t("common.columns.admin")}
                icon={<CommonIconHelp text={t("profiles.help.admin")} />}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {editingRole === "patient" && (
        <>
          <Divider className={styles.divider} />

          <div className={styles.responsiblesContainer}>
            <CommonCollapse
              title={t("common.columns.parent")}
              icon={<IconUser size={16} color={COLORS.grey70} />}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name={["parent", "name"]}>
                    <CommonTextInput label={t("common.columns.name")} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name={["parent", "cpf"]} normalize={cpfMask}>
                    <CommonTextInput label={t("common.columns.cpf")} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name={["parent", "phone"]} normalize={phoneMask}>
                    <CommonTextInput label={t("common.columns.phone")} />
                  </Form.Item>
                </Col>
              </Row>
            </CommonCollapse>
          </div>
        </>
      )}
    </Form>
  );
};

export const ProfileFormOptions = () => {
  const { t } = useTranslation();
  const { profile, isSubmitting, editingRole, deleteProfile } = useProfilesForm();

  return (
    <>
      {profile?.id && (
        <CommonButton
          onClick={() => deleteProfile(profile.id)}
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
          ? t(`profiles.${editingRole}s.actions.edit`)
          : t(`profiles.${editingRole}s.actions.create`)}
      </CommonButton>
    </>
  );
};
