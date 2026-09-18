import { useEffect, useMemo } from "react";
import { Form, Row, Col, Flex, Skeleton, Upload, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonAvatar } from "@/shared/components/CommonAvatar/CommonAvatar";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import {
  phoneMask,
  cpfMask,
  rgMask,
  crpMask,
  dateValueProps,
  normalizeDate,
  isFutureDate,
} from "@/shared/utils/formatters";

import { useTherapistFormState } from "../../hooks/useTherapistFormState";
import { useTherapistForm } from "../../hooks/useTherapistForm";
import type { Therapist } from "../../types/therapist";
import { getGenderOptions } from "../../utils/form";
import { TOKENS } from "@/shared/theme";
import styles from "./TherapistForm.module.css";

// Limpar o select devolve undefined, que o JSON descarta: sem virar null, o
// supervisor removido nunca chegava ao servidor.
const normalizeSupervisor = (value?: number | null) => value ?? null;

export const TherapistForm = () => {
  const { t } = useTranslation();
  const { profile: currentProfile } = useAuth();
  const canManage = !!currentProfile?.admin;
  const [form] = Form.useForm<Partial<Therapist>>();

  // A obrigatoriedade era só visual (o asterisco da prop `required`): sem
  // `rules`, todo campo em branco só era barrado pelo servidor.
  const requiredRule = useMemo(
    () => [{ required: true, message: t("common.errors.required") }],
    [t],
  );

  const emailRules = useMemo(
    () => [
      { required: true, message: t("common.errors.required") },
      { type: "email" as const, message: t("common.errors.invalidEmail") },
    ],
    [t],
  );
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

  const therapistId = therapist?.id;
  const supervisorExcludeIds = useMemo(
    () => (therapistId ? [therapistId] : undefined),
    [therapistId],
  );

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
        align="center" gap={TOKENS.space[16]}
        className={styles.avatarContainer}
      >
        <CommonAvatar
          size={56}
          name={therapist?.name}
          photoUrl={photoUrl}
        />
        <Flex vertical gap={TOKENS.space[2]} className={styles.avatarText}>
          <span className={styles.avatarTitle}>{t("therapists.form.photo")}</span>
          <span className={styles.avatarHint}>{t("therapists.form.photoHint")}</span>
        </Flex>
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
            outline
          >
            {t("therapists.form.upload")}
          </CommonButton>
        </Upload>
        <Tooltip title={t("common.actions.delete")}>
          <CommonButton
            onClick={() => {
              setChangedPhoto(true);
              setUploadedPhoto(undefined);
            }}
            icon={<IconTrash size={18} />}
            buttonVariant="danger"
            outline
          />
        </Tooltip>
      </Flex>

      <Row gutter={TOKENS.space[16]}>
        <Col span={12}>
          <Form.Item name="name" rules={requiredRule}>
            <CommonTextInput
              label={t("therapists.columns.name")}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" rules={emailRules}>
            <CommonTextInput
              label={t("therapists.columns.email")}
              disabled={!!therapist?.id}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={TOKENS.space[16]}>
        <Col span={12}>
          <Form.Item name="gender" rules={requiredRule}>
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
            rules={requiredRule}
            getValueProps={dateValueProps}
            normalize={normalizeDate}
          >
            <CommonDatePicker
              label={t("therapists.columns.birth")}
              disabledDate={isFutureDate}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={TOKENS.space[16]}>
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

      <Row gutter={TOKENS.space[16]}>
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

      {/* Supervisor, situação e admin o backend só aceita de admin (ver
          ADMIN_ONLY_ATTRIBUTES): sem este recorte o terapeuta comum ligava o
          switch, via "atualizado com sucesso" e nada mudava. */}
      <Row gutter={TOKENS.space[16]}>
        <Col span={12}>
          <Form.Item name="supervisor_id" normalize={normalizeSupervisor}>
            <ProfilesSelect
              role="therapist"
              label={t("therapists.columns.supervisor")}
              selectedProfile={therapist?.supervisor ?? undefined}
              excludeIds={supervisorExcludeIds}
              disabled={!canManage}
              allowClear={canManage}
            />
          </Form.Item>
        </Col>
      </Row>

      {canManage && (
        <Flex vertical gap={TOKENS.space[12]} className={styles.switches}>
          <Flex align="center" gap={TOKENS.space[12]} wrap>
            <Form.Item name="active" noStyle>
              <CommonSwitch
                label={t("therapists.columns.active")}
                disabled={!therapist?.id}
              />
            </Form.Item>
            <span className={styles.switchHint}>{t("therapists.help.active")}</span>
          </Flex>
          <Flex align="center" gap={TOKENS.space[12]} wrap>
            <Form.Item name="admin" noStyle>
              <CommonSwitch label={t("therapists.columns.admin")} />
            </Form.Item>
            <span className={styles.switchHint}>{t("therapists.help.admin")}</span>
          </Flex>
        </Flex>
      )}
    </Form>
  );
};

export const TherapistFormOptions = () => {
  const { t } = useTranslation();
  const { profile: currentProfile } = useAuth();
  const { therapist, isSubmitting, deleteTherapist } = useTherapistForm();

  return (
    <>
      {/* Excluir é só do admin; para os demais o botão só rendia um 403. */}
      {therapist?.id && currentProfile?.admin && (
        <CommonButton
          onClick={() => deleteTherapist(therapist.id)}
          buttonVariant="danger"
          outline
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
