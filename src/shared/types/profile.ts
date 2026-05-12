import type { BasicUser } from "./user";

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

export type BaseProfile = {
  id: number;
  name: string;
  gender: ProfileGender;
  birth: string;
  email: string;
  address?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  role: ProfileRole;
  active: boolean;
  photo?: File;
  photo_url?: string;
  remove_photo?: boolean;
  created_at: string;
  updated_at: string;
  user: BasicUser;
  last_service?: string;
};

export type ProfilesOrder = "name_asc" | "name_desc";
