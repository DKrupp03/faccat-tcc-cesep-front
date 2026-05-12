import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type {
  BaseProfile,
  ProfileMaritalStatus,
  ProfileEducationLevel,
  Parent,
  ProfilesOrder,
} from "@/shared/types/profile";
import type { PaymentStatus } from "@/modules/payments/types/payment";
import type { Therapist } from "@/modules/therapists/types/therapist";
import type { AnamneseType } from "./anamnese";

export type Patient = BaseProfile & {
  role: "patient";
  occupation?: string;
  marital_status?: ProfileMaritalStatus;
  education_level?: ProfileEducationLevel;
  parent?: Parent;
  default_value?: number | string;
  extra?: string;
  therapist_id?: number;
  therapist?: Therapist;
  patient_services_count?: number;
  services_count?: number;
  payment_status?: PaymentStatus;
  anamnese?: AnamneseType;
};

export type PatientResponse = CommonResponse & {
  profile: Patient;
};

export type PatientsFilter = {
  active: number;
  name?: string;
  therapist_id?: number;
  payment_status?: PaymentStatus | "all";
};

export type PatientsPayload = {
  profiles: PatientsFilter & { role: "patient" };
  order_by: ProfilesOrder;
  page?: number;
  per_page?: number;
};

export type PatientsResponse = CommonPanelResponse & {
  profiles: Patient[];
};
