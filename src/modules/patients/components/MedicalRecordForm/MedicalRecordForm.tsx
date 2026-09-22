import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Flex } from "antd";

import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonDocuments } from "@/shared/components/CommonDocuments/CommonDocuments";
import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { CommonIconAlert } from "@/shared/components/CommonAlertIcon/CommonAlertIcon";
import { CommonIconHelp } from "@/shared/components/CommonHelpIcon/CommonHelpIcon";
import { CommonNoticeCard } from "@/shared/components/CommonNoticeCard/CommonNoticeCard";
import { ServicesSelect } from "@/shared/components/ServicesSelect/ServicesSelect";
import { dateValueProps, formatDateTimeInline, normalizeDate } from "@/shared/utils/formatters";

import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import type { MedicalRecordType } from "../../types/medicalRecord";
import { TOKENS } from "@/shared/theme";
import styles from "./MedicalRecordForm.module.css";

type MedicalRecordFormProps = {
  lockedFields?: Array<keyof MedicalRecordType>;
  defaultValues?: Partial<MedicalRecordType>;
};

export const MedicalRecordForm = ({
  lockedFields = [],
  defaultValues,
}: MedicalRecordFormProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<Partial<MedicalRecordType>>();
  const {
    isFormOpen,
    medicalRecord,
    submitMedicalRecord,
    patientId,
    serviceTherapist,
    setFormServiceId,
    access,
  } = useMedicalRecords();

  // A obrigatoriedade era só visual (o asterisco da prop `required`): sem
  // `rules`, todo campo em branco só era barrado pelo servidor.
  const requiredRule = useMemo(
    () => [{ required: true, message: t("common.errors.required") }],
    [t],
  );

  // Quem edita o quê vem do atendimento escolhido: o provider busca o
  // terapeuta dele e daí tira as permissões, que o rodapé também consulta.
  const serviceId = Form.useWatch("service_id", form);

  useEffect(() => {
    if (serviceId) setFormServiceId(serviceId);
  }, [serviceId, setFormServiceId]);

  // O visto não se desfaz depois de salvo: nem o supervisor que o deu desmarca
  // (a API recusa do mesmo jeito). Antes de salvar o campo ainda vai e volta.
  const isReviewSaved = medicalRecord?.reviewed ?? false;

  // O visto é sobre o que o terapeuta registrou: enquanto o prontuário não
  // existe não há o que visar, então o campo só abre depois de salvo.
  const isRecordSaved = !!medicalRecord?.id;
  const canReview = access.canEditSupervision && !isReviewSaved;

  // O `lockedFields` continua valendo por cima: na aba de prontuário do
  // atendimento o vínculo já está resolvido e não se troca por ali.
  const isDisabled = (field: keyof MedicalRecordType) => (
    !access.canEditRecord || lockedFields.includes(field)
  );

  const reviewHint = isReviewSaved && medicalRecord?.reviewer
    ? t("patients.medicalRecords.help.reviewedBy", {
      name: medicalRecord.reviewer.name,
      date: formatDateTimeInline(medicalRecord.reviewed_at ?? undefined),
    })
    : t("patients.medicalRecords.help.reviewed");

  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  // Limpa os anexos pendentes a cada nova sessão de edição (sem efeito, para
  // evitar renders em cascata) comparando com a chave de sessão anterior.
  const sessionKey = isFormOpen ? medicalRecord?.id ?? "new" : null;
  const [prevSessionKey, setPrevSessionKey] = useState(sessionKey);
  if (prevSessionKey !== sessionKey) {
    setPrevSessionKey(sessionKey);
    setNewFiles([]);
    setRemovedIds([]);
  }

  useEffect(() => {
    if (isFormOpen) {
      if (medicalRecord) {
        form.setFieldsValue({ ...defaultValues, ...medicalRecord });
      } else {
        form.resetFields();
        if (defaultValues) form.setFieldsValue(defaultValues);
      }
    }
  }, [isFormOpen, medicalRecord, defaultValues, form]);

  const visibleDocuments = useMemo(() => (
    (medicalRecord?.attachments ?? []).filter((doc) => !removedIds.includes(doc.id))
  ), [medicalRecord?.attachments, removedIds]);

  const handleFinish = (values: Partial<MedicalRecordType>) => {
    submitMedicalRecord({
      ...values,
      reviewed: values.reviewed ?? false,
      new_attachments: newFiles,
      remove_attachment_ids: removedIds,
    });
  };

  const isServiceLocked = isDisabled("service_id");

  // As regras abrem o formulário: os campos bloqueados só fazem sentido com
  // elas à vista, e quem só consulta entende de saída por que nada abre.
  const rules = useMemo(() => ([
    t("patients.medicalRecords.rules.create"),
    t("patients.medicalRecords.rules.therapist"),
    t("patients.medicalRecords.rules.supervisor"),
    t("patients.medicalRecords.rules.review"),
    t("patients.medicalRecords.rules.others"),
  ]), [t]);

  return (
    // O corpo da gaveta é um flex em linha: sem a coluna, o card ficaria ao
    // lado do formulário em vez de abrir o bloco.
    <Flex vertical className={styles.wrapper}>
      <CommonNoticeCard
        className={styles.rules}
        title={t("patients.medicalRecords.rules.title")}
        items={rules}
      />

      <Form
        id="medical-record-form"
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        initialValues={defaultValues}
        className={styles.form}
      >
        <Row gutter={TOKENS.space[16]}>
          <Col span={16}>
            <Form.Item name="title" rules={requiredRule}>
              <CommonTextInput
                label={t("patients.medicalRecords.columns.title")}
                required
                disabled={isDisabled("title")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="date"
              rules={requiredRule}
              getValueProps={dateValueProps}
              normalize={normalizeDate}
            >
              <CommonDatePicker
                label={t("patients.medicalRecords.columns.date")}
                required
                disabled={isDisabled("date")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={TOKENS.space[16]}>
          <Col span={serviceTherapist ? 16 : 24}>
            <Form.Item name="service_id" rules={requiredRule}>
              <ServicesSelect
                label={t("patients.medicalRecords.columns.service")}
                required
                disabled={isServiceLocked}
                allowClear={false}
                patientId={patientId}
                withoutMedicalRecord
              />
            </Form.Item>
          </Col>
          {serviceTherapist && (
            <Col span={8}>
              {/* Fora do Form: é informação do atendimento, não campo do
                  prontuário — não entra no que é enviado ao salvar. */}
              <CommonSelect
                label={t("patients.medicalRecords.columns.therapist")}
                options={[{ label: serviceTherapist.name, value: serviceTherapist.id }]}
                value={serviceTherapist.id}
                disabled
              />
            </Col>
          )}
        </Row>

        <Row gutter={TOKENS.space[16]}>
          <Col span={24}>
            <Form.Item name="evolution" rules={requiredRule}>
              <CommonTextArea
                label={t("patients.medicalRecords.columns.evolution")}
                rows={7}
                required
                disabled={isDisabled("evolution")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={TOKENS.space[16]}>
          <Col span={24}>
            <Form.Item name="documentary_record">
              <CommonTextArea
                label={t("patients.medicalRecords.columns.documentaryRecord")}
                disabled={isDisabled("documentary_record")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={TOKENS.space[16]}>
          <Col span={24}>
            <Form.Item name="supervision_record">
              <CommonTextArea
                label={t("patients.medicalRecords.columns.supervisionRecord")}
                disabled={!access.canEditSupervision}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={TOKENS.space[16]}>
          <Col span={24}>
            <Flex align="center" gap={TOKENS.space[12]} className={styles.reviewedRow}>
              <Form.Item name="reviewed" noStyle>
                <CommonSwitch
                  label={t("patients.medicalRecords.columns.reviewed")}
                  disabled={!canReview}
                  icon={isRecordSaved ? undefined : (
                    <CommonIconAlert text={t("patients.medicalRecords.help.notSaved")} />
                  )}
                />
              </Form.Item>
              <span className={styles.reviewedHint}>{reviewHint}</span>
            </Flex>
          </Col>
        </Row>

        <Row gutter={TOKENS.space[16]} className={styles.documents}>
          <Col span={24}>
            <CommonDocuments
              label={t("common.documents.title")}
              documents={visibleDocuments}
              pendingFiles={newFiles}
              onUpload={(files) => setNewFiles((prev) => [...prev, ...files])}
              onRemove={(id) => setRemovedIds((prev) => [...prev, Number(id)])}
              onRemovePending={(idx) => setNewFiles((prev) => prev.filter((_, i) => i !== idx))}
              disabled={!access.canEditRecord}
            />
          </Col>
        </Row>
      </Form>
    </Flex>
  );
};

type MedicalRecordFormOptionsProps = {
  showDelete?: boolean;
};

export const MedicalRecordFormOptions = ({
  showDelete = true,
}: MedicalRecordFormOptionsProps) => {
  const { t } = useTranslation();
  const {
    medicalRecord,
    isSubmitting,
    deleteMedicalRecord,
    access,
  } = useMedicalRecords();

  const isRecordSaved = !!medicalRecord?.id;

  // Botão barrado pede explicação: criar é só do terapeuta do atendimento, e
  // editar, só dele e do supervisor — para os demais o prontuário é leitura.
  const blockedHint = isRecordSaved
    ? t("patients.medicalRecords.help.readOnly")
    : t("patients.medicalRecords.help.onlyTherapistCreates");

  return (
    <>
      {showDelete && medicalRecord?.id && (
        <CommonButton
          onClick={() => deleteMedicalRecord(medicalRecord.id)}
          buttonVariant="danger"
          outline
          loading={isSubmitting}
          disabled={!access.canDelete}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      {!access.canSubmit && <CommonIconHelp text={blockedHint} size={18} />}
      <CommonButton
        htmlType="submit"
        form="medical-record-form"
        buttonVariant="primary"
        loading={isSubmitting}
        disabled={!access.canSubmit}
      >
        {isRecordSaved
          ? t("patients.medicalRecords.actions.edit")
          : t("patients.medicalRecords.actions.create")}
      </CommonButton>
    </>
  );
};
