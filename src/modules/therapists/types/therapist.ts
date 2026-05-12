import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { BaseProfile, ProfilesOrder } from "@/shared/types/profile";

export type Therapist = BaseProfile & {
  role: "therapist";
  crp?: string;
  admin: boolean;
  patients_count?: number;
  therapist_services_count?: number;
  services_count?: number;
};

export type TherapistResponse = CommonResponse & {
  profile: Therapist;
};

export type TherapistsFilter = {
  active: number;
  name?: string;
  patient_id?: number;
};

export type TherapistsPayload = {
  profiles: TherapistsFilter & { role: "therapist" };
  order_by: ProfilesOrder;
  page?: number;
  per_page?: number;
};

export type TherapistSubmitPayload = {
  email: string;
  profile: Partial<Therapist>;
};

export type TherapistsResponse = CommonPanelResponse & {
  profiles: Therapist[];
};
