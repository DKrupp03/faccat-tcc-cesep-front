import { type CommonResponse } from "@/shared/types/common";
import type { BasicUser } from "@/shared/types/user";
import type { Therapist } from "@/modules/therapists/types/therapist";

export type SignInResponse = CommonResponse & {
  token: string;
  user: BasicUser;
};

export type AuthContextType = {
  token: string | null;
  user: BasicUser | null;
  profile: Therapist | null;
  setProfile: (profile: Therapist) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
