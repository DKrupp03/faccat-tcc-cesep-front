import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Skeleton, Flex, Typography, Divider } from "antd";
import { IconCalendarClock } from "@tabler/icons-react";
import dayjs, { type Dayjs } from "dayjs";

import { CommonSelect } from "@/shared/components/CommonSelect/CommonSelect";
import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonTimePicker } from "@/shared/components/CommonTimePicker";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonSwitch } from "@/shared/components/CommonSwitch/CommonSwitch";
import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";
import { COLORS } from "@/shared/theme";
import { integerMask } from "@/shared/utils/formatters";
import { rangeRule } from "@/shared/utils/filterRules";
import PatientsService from "@/modules/patients/services/PatientsService";

import { useServiceForm } from "../../hooks/useServiceForm";
import {
  getFrequencyOptions,
  getRecurrenceSummary,
  getServiceTypeOptions,
  getStatusOptions,
  getWeekdayOptions,
} from "../../utils/form";
import type { ServiceFormValues } from "../../types/service";
import styles from "./ServiceForm.module.css";

const { Text } = Typography;

// A API devolve horários como "HH:MM" e datas como "YYYY-MM-DD"; os pickers
// trabalham com dayjs, então cada Form.Item converte nos dois sentidos.
const dateValueProps = (value?: string) => ({ value: value ? dayjs(value) : undefined });
const normalizeDate = (value?: Dayjs) => value?.format("YYYY-MM-DD");

// Espelham os limites do model (ServiceRecurrence): antes o usuário só
// descobria o teto depois de enviar e receber o erro do servidor.
const MAX_OCCURRENCES = 366;
const MAX_REPEAT_INTERVAL = 99;

const isPastDate = (current: Dayjs) => !!current && current < dayjs().startOf("day");

const timeValueProps = (value?: string) => ({
  value: value ? dayjs(`2000-01-01T${value}`) : undefined,
});
const normalizeTime = (value?: Dayjs) => value?.format("HH:mm");

export const ServiceForm = () => {
  const { t } = useTranslation();
  const {
    isFormOpen,
    service,
    loadingService,
    submitService,
    therapistId,
    patientId,
  } = useServiceForm();

  const [form] = Form.useForm<ServiceFormValues>();

  const serviceTypeOptions = useMemo(() => getServiceTypeOptions(t), [t]);
  const statusOptions = useMemo(() => getStatusOptions(t), [t]);
  const frequencyOptions = useMemo(() => getFrequencyOptions(t), [t]);
  const weekdayOptions = useMemo(() => getWeekdayOptions(t), [t]);

  const requiredRule = useMemo(
    () => [{ required: true, message: t("common.errors.required") }],
    [t],
  );

  const isRecurrent = Form.useWatch("recurrent", form);
  const frequency = Form.useWatch(["recurrence", "frequency"], form);
  const endType = Form.useWatch(["recurrence", "end_type"], form);
  // Toda mudança do formulário recalcula a frase-resumo da recorrência.
  const values = Form.useWatch([], form);

  // O padrão da recorrência é imutável depois que a série existe: editar uma
  // ocorrência não pode regerar (ou apagar) as demais. A recorrência também só
  // pode ser ligada na criação, nunca ao editar um atendimento avulso.
  const isExistingSeries = !!service?.recurrence_id;
  const isEditing = !!service?.id;

  const recurrenceSummary = useMemo(
    () => (isRecurrent && values ? getRecurrenceSummary(t, values) : ""),
    [t, isRecurrent, values],
  );

  // Preenche o select de terapeuta com o terapeuta padrão do paciente (se ele
  // tiver um). Ignorado quando o terapeuta está travado.
  const fillDefaultTherapist = useCallback(async (newPatientId: number) => {
    if (therapistId) return;

    const response = await PatientsService.getPatient(newPatientId);
    if (response.success && response.profile.therapist_id) {
      form.setFieldValue("therapist_id", response.profile.therapist_id);
    }
  }, [form, therapistId]);

  useEffect(() => {
    if (isFormOpen) {
      if (service) {
        form.setFieldsValue({
          ...service,
          recurrent: !!service.recurrence_id,
          recurrence: service.recurrence,
        });
      } else {
        form.resetFields();
        // Novo atendimento a partir da aba do paciente: já traz o terapeuta padrão.
        if (patientId) fillDefaultTherapist(patientId);
      }
    }
  }, [isFormOpen, service, patientId, form, fillDefaultTherapist]);

  // Ao trocar o paciente, preenche o terapeuta com o terapeuta padrão dele.
  const handleValuesChange = (changed: ServiceFormValues) => {
    if (!("patient_id" in changed) || !changed.patient_id) return;
    fillDefaultTherapist(changed.patient_id);
  };

  if (loadingService) {
    return (
      <Skeleton
        className={styles.form}
        paragraph={{ rows: 6 }}
        active
      />
    );
  }

  return (
    <Form
      id="service-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={submitService}
      onValuesChange={handleValuesChange}
      initialValues={{
        status: "scheduled",
        therapist_id: therapistId,
        patient_id: patientId,
        recurrent: false,
        recurrence: {
          frequency: "weekly",
          repeat_interval: 1,
          end_type: "by_date",
        },
      }}
      className={styles.form}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="patient_id" rules={requiredRule}>
            <ProfilesSelect
              role="patient"
              therapistId={therapistId}
              selectedProfile={service?.patient}
              disabled={!!patientId}
              allowClear={false}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="therapist_id" rules={requiredRule}>
            <ProfilesSelect
              role="therapist"
              selectedProfile={service?.therapist}
              disabled={!!therapistId}
              allowClear={false}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="service_type" rules={requiredRule}>
            <CommonSelect
              label={t("services.columns.serviceType")}
              options={serviceTypeOptions}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="status" rules={requiredRule}>
            <CommonSelect
              label={t("services.columns.status")}
              options={statusOptions}
              required
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="observations">
            <CommonTextArea
              label={t("services.columns.observations")}
              rows={4}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider className={styles.divider} />

      <CommonCollapse
        title={t("services.form.datesTimes")}
        icon={<IconCalendarClock size={16} color={COLORS.grey70} />}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date"
              rules={requiredRule}
              getValueProps={dateValueProps}
              normalize={normalizeDate}
            >
              <CommonDatePicker
                label={t("services.columns.date")}
                format="DD/MM/YYYY"
                disabledDate={isEditing ? undefined : isPastDate}
                required
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="start_time"
              rules={requiredRule}
              getValueProps={timeValueProps}
              normalize={normalizeTime}
            >
              <CommonTimePicker
                label={t("services.columns.startTime")}
                required
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="end_time"
              dependencies={["start_time"]}
              getValueProps={timeValueProps}
              normalize={normalizeTime}
              rules={[
                ...requiredRule,
                ({ getFieldValue }) => ({
                  validator(_, value?: string) {
                    const start = getFieldValue("start_time");
                    if (!value || !start || value > start) return Promise.resolve();
                    return Promise.reject(new Error(t("services.errors.endTimeBeforeStart")));
                  },
                }),
              ]}
            >
              <CommonTimePicker
                label={t("services.columns.endTime")}
                required
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="recurrent">
              <CommonSwitch
                label={t("services.recurrence.title")}
                disabled={isEditing}
              />
            </Form.Item>
          </Col>
        </Row>

        {isRecurrent && (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name={["recurrence", "frequency"]} rules={requiredRule}>
                  <CommonSelect
                    label={t("services.recurrence.frequency")}
                    options={frequencyOptions}
                    disabled={isExistingSeries}
                    allowClear={false}
                    required
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["recurrence", "repeat_interval"]}
                  rules={[...requiredRule, rangeRule(t, 1, MAX_REPEAT_INTERVAL)]}
                  normalize={integerMask}
                >
                  <CommonTextInput
                    label={t("services.recurrence.every")}
                    suffix={t(`services.recurrence.units.${frequency ?? "weekly"}`)}
                    disabled={isExistingSeries}
                    inputMode="numeric"
                    maxLength={2}
                    required
                  />
                </Form.Item>
              </Col>
              {frequency === "weekly" && (
                <Col span={8}>
                  <Form.Item name={["recurrence", "weekday"]} rules={requiredRule}>
                    <CommonSelect
                      label={t("services.recurrence.day")}
                      options={weekdayOptions}
                      disabled={isExistingSeries}
                      allowClear={false}
                      required
                    />
                  </Form.Item>
                </Col>
              )}
              {frequency === "monthly" && (
                <Col span={8}>
                  <Form.Item
                    name={["recurrence", "month_day"]}
                    rules={[...requiredRule, rangeRule(t, 1, 31)]}
                    normalize={integerMask}
                  >
                    <CommonTextInput
                      label={t("services.recurrence.day")}
                      disabled={isExistingSeries}
                      inputMode="numeric"
                      maxLength={2}
                      required
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Flex align="center" style={{ height: 44 }}>
                  <Form.Item name={["recurrence", "end_type"]} noStyle>
                    <CommonGroupButtons label={t("services.recurrence.end")}>
                      <CommonGroupButtons.Button value="by_date" disabled={isExistingSeries}>
                        {t("services.recurrence.endByDate")}
                      </CommonGroupButtons.Button>
                      <CommonGroupButtons.Button value="by_occurrences" disabled={isExistingSeries}>
                        {t("services.recurrence.endByOccurrences")}
                      </CommonGroupButtons.Button>
                    </CommonGroupButtons>
                  </Form.Item>
                </Flex>
              </Col>
              <Col span={12}>
                {endType === "by_occurrences" ? (
                  <Form.Item
                    name={["recurrence", "occurrences"]}
                    rules={[...requiredRule, rangeRule(t, 1, MAX_OCCURRENCES)]}
                    normalize={integerMask}
                  >
                    <CommonTextInput
                      label={t("services.recurrence.occurrences")}
                      disabled={isExistingSeries}
                      inputMode="numeric"
                      maxLength={3}
                      required
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name={["recurrence", "end_date"]}
                    dependencies={["date"]}
                    getValueProps={dateValueProps}
                    normalize={normalizeDate}
                    rules={[
                      ...requiredRule,
                      ({ getFieldValue }) => ({
                        validator(_, value?: string) {
                          const start = getFieldValue("date");
                          if (!value || !start || value >= start) return Promise.resolve();
                          return Promise.reject(new Error(t("services.errors.endDateBeforeStart")));
                        },
                      }),
                    ]}
                  >
                    <CommonDatePicker
                      label={t("services.recurrence.endDate")}
                      format="DD/MM/YYYY"
                      disabled={isExistingSeries}
                      required
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>

            {recurrenceSummary && (
              <Text className={styles.recurrenceSummary}>
                {recurrenceSummary}
              </Text>
            )}

            {isExistingSeries && (
              <Text className={styles.recurrenceHint}>
                {t("services.recurrence.locked")}
              </Text>
            )}
          </>
        )}
      </CommonCollapse>
    </Form>
  );
};

export const ServiceFormOptions = () => {
  const { t } = useTranslation();
  const { service, isSubmitting, deleteService } = useServiceForm();

  return (
    <>
      {service?.id && (
        <CommonButton
          onClick={() => deleteService(service.id)}
          buttonVariant="danger"
          loading={isSubmitting}
        >
          {t("common.actions.delete")}
        </CommonButton>
      )}
      <CommonButton
        htmlType="submit"
        form="service-form"
        buttonVariant="primary"
        loading={isSubmitting}
      >
        {service?.id
          ? t("services.actions.edit")
          : t("services.actions.create")}
      </CommonButton>
    </>
  );
};
