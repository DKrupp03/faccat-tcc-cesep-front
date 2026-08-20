import { type CommonResponse } from "@/shared/types/common";
import type { BasicUser } from "@/shared/types/user";
import type { ProfileGender, ProfileRole } from "@/shared/types/profile";
import type { Therapist } from "@/modules/therapists/types/therapist";

export type SignInResponse = CommonResponse & {
  user: BasicUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  gender: ProfileGender;
  birth: string;
  role: ProfileRole;
};

export type AuthContextType = {
  user: BasicUser | null;
  profile: Therapist | null;
  setProfile: (profile: Therapist) => void;
  isAuthenticated: boolean;
  // Verdadeiro enquanto a sessão é reidratada via GET /me no carregamento.
  initializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
