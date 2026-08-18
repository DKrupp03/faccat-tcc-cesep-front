import type { TFunction } from "i18next";

import { formatDate } from "@/shared/utils/formatters";
import type {
  RecurrenceFrequency,
  ServiceFormValues,
  ServiceStatus,
  ServiceType,
} from "../types/service";

const SERVICE_STATUSES: ServiceStatus[] = [
  "scheduled",
  "confirmed",
  "attended",
  "no_show",
  "cancelled",
];

const SERVICE_TYPES: ServiceType[] = [
  "clinical_psychology_tcc",
  "clinical_psychology_psychoanalysis",
  "clinical_psychology_systemic",
  "clinical_psychology_humanistic",
  "psychological_emergency_care",
  "school_psychology",
  "forensic_psychology",
  "community_psychology",
  "emergency_and_disaster_psychology",
  "organizational_psychology_career_guidance",
  "organizational_psychology_worker_health",
];

export const getStatusOptions = (t: TFunction) =>
  SERVICE_STATUSES.map((status) => ({
    value: status,
    label: t(`services.status.${status}`),
  }));

export const getServiceTypeOptions = (t: TFunction) =>
  SERVICE_TYPES.map((type) => ({
    value: type,
    label: t(`services.serviceTypes.${type}`),
  }));

const RECURRENCE_FREQUENCIES: RecurrenceFrequency[] = ["daily", "weekly", "monthly"];

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export const getFrequencyOptions = (t: TFunction) =>
  RECURRENCE_FREQUENCIES.map((frequency) => ({
    value: frequency,
    label: t(`services.recurrence.frequencies.${frequency}`),
  }));

export const getWeekdayOptions = (t: TFunction) =>
  WEEKDAYS.map((weekday) => ({
    value: weekday,
    label: t(`services.recurrence.weekdays.${weekday}`),
  }));

// Frase-resumo exibida abaixo dos campos, ex.:
// "Repete a cada 4 semanas, no(a) domingo, com início no dia 18/08/2026 e fim no dia 29/08/2026."
export const getRecurrenceSummary = (t: TFunction, values: ServiceFormValues) => {
  const { date, recurrence } = values;
  const { frequency, repeat_interval, end_type, end_date, occurrences, weekday, month_day } =
    recurrence ?? {};

  if (!frequency || !repeat_interval || !date) return "";

  // Os campos numéricos passam por máscara e ficam como texto no formulário; a
  // pluralização do i18next precisa de número.
  const parts = [
    t(`services.recurrence.summary.${frequency}`, { count: Number(repeat_interval) }),
  ];

  if (frequency === "weekly" && weekday !== undefined && weekday !== null) {
    parts.push(t("services.recurrence.summary.onWeekday", {
      weekday: t(`services.recurrence.weekdays.${weekday}`).toLowerCase(),
    }));
  }

  if (frequency === "monthly" && month_day) {
    parts.push(t("services.recurrence.summary.onMonthDay", { day: month_day }));
  }

  parts.push(t("services.recurrence.summary.start", { date: formatDate(date) }));

  if (end_type === "by_date" && end_date) {
    parts.push(t("services.recurrence.summary.endDate", { date: formatDate(end_date) }));
  } else if (end_type === "by_occurrences" && occurrences) {
    parts.push(t("services.recurrence.summary.endOccurrences", { count: Number(occurrences) }));
  }

  return `${parts.join(", ")}.`;
};
