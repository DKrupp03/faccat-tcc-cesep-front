import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { BasicUser } from "./user";
import type { PaymentStatus } from "@/modules/payments/types/payment";
import type { AnamneseType } from "./anamnese";

export type ProfileGender = "male" | "female" | "other";

export type ProfileRole = "therapist" | "patient";

export type ProfileMaritalStatus =
  | "single"
  | "married"
  | "divorced"
  | "widowed";

export type ProfileEducationLevel =
  | "elementary_incomplete"
  | "elementary_complete"
  | "high_school_incomplete"
  | "high_school_complete"
  | "technical"
  | "higher_education_incomplete"
  | "higher_education_complete"
  | "postgraduate"
  | "masters"
  | "doctorate";

export type Parent = {
  name: string;
  phone: string;
  cpf: string;
};

export type Profile = {
  id: number;
  name: string;
  gender: ProfileGender;
  birth: string;
  email: string;
  address?: string;
  occupation?: string;
  marital_status?: ProfileMaritalStatus;
  education_level?: ProfileEducationLevel;
  phone?: string;
  cpf?: string;
  rg?: string;
  crp?: string;
  parent?: Parent;
  default_value?: number | string;
  extra?: string;
  role: ProfileRole;
  admin: boolean;
  active: boolean;
  therapist_id?: number;
  photo?: File;
  photo_url?: string;
  remove_photo?: boolean;
  created_at: string;
  updated_at: string;
  therapist?: Profile;
  patients_count?: number;
  patient_services_count?: number;
  therapist_services_count?: number;
  payment_status?: PaymentStatus;
  last_service?: string;
  user: BasicUser;
  anamnese?: AnamneseType;
};

export type ProfileResponse = CommonResponse & {
  profile: Profile;
};

export type ProfilesFilter = {
  active: number;
  role: ProfileRole;
  name?: string;
  therapist_id?: number;
  patient_id?: number;
  payment_status?: PaymentStatus | "all";
};

export type ProfilesOrder = "name_asc" | "name_esc";

export type ProfilesPayload = {
  profiles: ProfilesFilter;
  order_by: ProfilesOrder;
  page?: number;
  per_page?: number;
};

export type ProfileSubmitPayload = {
  email: string;
  profile: Partial<Profile>;
};

export type ProfilesResponse = CommonPanelResponse & {
  profiles: Profile[];
};