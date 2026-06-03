import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { MedicalRecordType } from "@/modules/patients/types/medicalRecord";

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

export type Service = {
  id: number;
  datetime_start: string;
  datetime_end: string;
  observations?: string;
  service_type: ServiceType;
  status: ServiceStatus;
  patient_id: number;
  therapist_id: number;
  created_at: string;
  updated_at: string;
  patient?: ServiceProfile;
  therapist?: ServiceProfile;
  medical_record?: MedicalRecordType;
};

export type ServicesOrder = "datetime_start_desc" | "datetime_start_asc";

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
