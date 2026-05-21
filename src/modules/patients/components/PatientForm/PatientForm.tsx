import { useEffect, useMemo } from "react";
import { Form, Row, Col, Flex, Skeleton, Upload, Divider } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { IconTrash, IconUpload, IconUser } from "@tabler/icons-react";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";
import { phoneMask, cpfMask, rgMask, decimalMask } from "@/shared/utils/formatters";
import { COLORS } from "@/shared/theme";

import { usePatientFormState } from "../../hooks/usePatientFormState";
import { usePatientForm } from "../../hooks/usePatientForm";
import type { Patient } from "../../types/patient";
import { getGenderOptions, getMaritalStatusOptions, getEducationLevelOptions } from "../../utils/form";
import styles from "./PatientForm.module.css";

export const PatientForm = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const { therapistId } = usePatientForm();
  const {
    isFormOpen,
    patient,
    loadingPatient,
    setUploadedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  } = usePatientFormState();

  const [form] = Form.useForm<Partial<Patient>>();
  
  const genderOptions = getGenderOptions(t);
  const maritalStatusOptions = getMaritalStatusOptions(t);
  const educationLevelOptions = getEducationLevelOptions(t);

  const regularTherapist = useMemo(() => (
    !patient?.id && !!therapistId
  ), [patient?.id, therapistId]);

  useEffect(() => {
    if (isFormOpen) {
      if (patient) {
        form.setFieldsValue(patient);
      } else {
        form.resetFields();
      }
    }
  }, [isFormOpen, patient, form]);

  if (loadingPatient) {
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
      id="patient-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit}
      initialValues={{
        role: "patient",
        active: true,
        ...(regularTherapist && { therapist_id: therapistId }),
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
              disabled={!!patient?.id}
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
        <Col span={12}>
          <Form.Item name="cpf" normalize={cpfMask}>
            <CommonTextInput label={t("common.columns.cpf")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="rg" normalize={rgMask}>
            <CommonTextInput label={t("common.columns.rg")} />
          </Form.Item>
        </Col>
      </Row>

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
              disabled={!profile?.admin}
              showHelp
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="default_value" normalize={decimalMask}>
            <CommonTextInput
              label={t("common.columns.defaultValue")}
              icon={<CommonIconHelp text={t("common.help.defaultValue")} />}
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

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="active">
            <CommonSwitch
              label={t("common.columns.active")}
              disabled={!patient?.id}
              icon={<CommonIconHelp text={t("patients.help.active")} />}
            />
          </Form.Item>
        </Col>
      </Row>

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
    </Form>
  );
};

export const PatientFormOptions = () => {
  const { t } = useTranslation();
  const { patient, isSubmitting, deletePatient } = usePatientForm();

  return (
    <>
      {patient?.id && (
        <CommonButton
          onClick={() => deletePatient(patient.id)}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="patient-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {patient?.id
          ? t("patients.actions.edit")
          : t("patients.actions.create")}
      </CommonButton>
    </>
  );
};
