import { type Profile } from "./profile";

export type User = {
  id: number;
  email: string;
  profile_id: number;
  profile?: Profile;
  jti: string;
  sign_in_count: number;
  last_sign_in_at: string | null;
  current_sign_in_at: string | null;
  last_sign_in_ip: string | null;
  current_sign_in_ip: string | null;
  confirmed_at: string | null;
  confirmation_sent_at: string | null;
  unconfirmed_email: string | null;
  reset_password_sent_at: string | null;
  remember_created_at: string | null;
  created_at: string;
  updated_at: string;
};
