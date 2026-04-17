import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";

export type ProfileGender = "male" | "female" | "other";

export type ProfileRole = "admin" | "therapist" | "patient";

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

export type Profile = {
  id: number;
  name: string;
  gender: ProfileGender;
  birth: string;
  address: string | null;
  occupation: string | null;
  marital_status: ProfileMaritalStatus | null;
  education_level: ProfileEducationLevel | null;
  phone: string | null;
  cpf: string | null;
  rg: string | null;
  crp: string | null;
  parent: Record<string, unknown> | null;
  default_value: number | null;
  extra: string | null;
  role: ProfileRole;
  active: boolean;
  therapist_id: number | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileResponse = CommonResponse & {
  profile: Profile;
};

export type ProfilesFilter = {
  active: boolean;
  role: ProfileRole;
  name?: string;
  therapist_id?: number;
};

export type ProfilesOrder = "name_asc" | "name_esc";

export type ProfilesPayload = {
  profiles: ProfilesFilter;
  order_by: ProfilesOrder;
  page?: number;
  per_page?: number;
};

export type ProfilesResponse = CommonPanelResponse & {
  profiles: Profile[];
};