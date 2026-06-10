import { useEffect } from "react";
import { Form, Row, Col, Flex, Skeleton, Upload } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import { phoneMask, cpfMask, rgMask, crpMask } from "@/shared/utils/formatters";

import { useTherapistFormState } from "../../hooks/useTherapistFormState";
import { useTherapistForm } from "../../hooks/useTherapistForm";
import type { Therapist } from "../../types/therapist";
import { getGenderOptions } from "../../utils/form";
import styles from "./TherapistForm.module.css";

export const TherapistForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<Partial<Therapist>>();
  const {
    isFormOpen,
    therapist,
    loadingTherapist,
    setUploadedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  } = useTherapistFormState();

  const genderOptions = getGenderOptions(t);

  useEffect(() => {
    if (isFormOpen) {
      if (therapist) {
        form.setFieldsValue(therapist);
      } else {
        form.resetFields();
      }
    }
  }, [isFormOpen, therapist, form]);

  if (loadingTherapist) {
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
      id="therapist-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit}
      initialValues={{
        role: "therapist",
        active: true,
        admin: false,
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
              label={t("therapists.columns.name")}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email">
            <CommonTextInput
              label={t("therapists.columns.email")}
              disabled={!!therapist?.id}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="gender">
            <CommonSelect
              label={t("therapists.columns.gender")}
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
              label={t("therapists.columns.birth")}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="phone" normalize={phoneMask}>
            <CommonTextInput label={t("therapists.columns.phone")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address">
            <CommonTextInput label={t("therapists.columns.address")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="crp" normalize={crpMask}>
            <CommonTextInput label={t("therapists.columns.crp")} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="cpf" normalize={cpfMask}>
            <CommonTextInput label={t("therapists.columns.cpf")} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="rg" normalize={rgMask}>
            <CommonTextInput label={t("therapists.columns.rg")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="active">
            <CommonSwitch
              label={t("therapists.columns.active")}
              disabled={!therapist?.id}
              icon={<CommonIconHelp text={t("therapists.help.active")} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} className={styles.switch}>
        <Col span={6}>
          <Form.Item name="admin">
            <CommonSwitch
              label={t("therapists.columns.admin")}
              icon={<CommonIconHelp text={t("therapists.help.admin")} />}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export const TherapistFormOptions = () => {
  const { t } = useTranslation();
  const { therapist, isSubmitting, deleteTherapist } = useTherapistForm();

  return (
    <>
      {therapist?.id && (
        <CommonButton
          onClick={() => deleteTherapist(therapist.id)}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="therapist-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {therapist?.id
          ? t("therapists.actions.edit")
          : t("therapists.actions.create")}
      </CommonButton>
    </>
  );
};
