import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { MedicalRecordType } from "@/modules/patients/types/medicalRecord";
import type { Payment } from "@/modules/payments/types/payment";

export type ServiceStatus =
  | "scheduled"
  | "confirmed"
  | "attended"
  | "no_show"
  | "cancelled";

export type ServiceType =
  | "clinical_psychology_tcc"
  | "clinical_psychology_psychoanalysis"
  | "clinical_psychology_systemic"
  | "clinical_psychology_humanistic"
  | "psychological_emergency_care"
  | "school_psychology"
  | "forensic_psychology"
  | "community_psychology"
  | "emergency_and_disaster_psychology"
  | "organizational_psychology_career_guidance"
  | "organizational_psychology_worker_health";

export type ServiceProfile = {
  id: number;
  name: string;
};

export type RecurrenceFrequency = "daily" | "weekly" | "monthly";

export type RecurrenceEndType = "by_date" | "by_occurrences";

// Escopo escolhido na modal ao editar/excluir uma ocorrência de uma série.
export type ServiceScope = "single" | "future" | "all";

export type ServiceRecurrence = {
  id: number;
  frequency: RecurrenceFrequency;
  repeat_interval: number;
  start_date: string;
  end_type: RecurrenceEndType;
  end_date?: string;
  occurrences?: number;
  weekday?: number;
  month_day?: number;
};

export type Service = {
  id: number;
  date: string;
  start_time?: string;
  end_time?: string;
  observations?: string;
  service_type: ServiceType;
  status: ServiceStatus;
  patient_id: number;
  therapist_id: number;
  recurrence_id?: number;
  created_at: string;
  updated_at: string;
  patient?: ServiceProfile;
  therapist?: ServiceProfile;
  medical_record?: MedicalRecordType;
  payment?: Payment;
  recurrence?: ServiceRecurrence;
};

// No formulário os campos numéricos passam por máscara e ficam como texto,
// mas chegam da API como número ao editar uma série existente.
export type ServiceRecurrenceFormValues = Omit<
  Partial<ServiceRecurrence>,
  "repeat_interval" | "occurrences" | "month_day"
> & {
  repeat_interval?: number | string;
  occurrences?: number | string;
  month_day?: number | string;
};

// Valores do formulário: além do atendimento, o switch e o padrão da recorrência.
export type ServiceFormValues = Partial<Service> & {
  recurrent?: boolean;
  recurrence?: ServiceRecurrenceFormValues;
};

export type ServicesOrder = "date_desc" | "date_asc";

export type ServicesPanelView = "calendar" | "list";

export type ServicesFilter = {
  date_start?: string;
  date_end?: string;
  patient_id?: number;
  therapist_id?: number;
  service_type?: ServiceType;
  status?: ServiceStatus;
};

export type ServicesPayload = {
  services: ServicesFilter;
  order_by: ServicesOrder;
  page?: number;
  per_page?: number;
};

export type ServiceResponse = CommonResponse & {
  service: Service;
};

export type ServicesResponse = CommonPanelResponse & {
  services: Service[];
};
