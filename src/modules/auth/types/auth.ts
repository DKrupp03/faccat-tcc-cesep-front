import { type CommonResponse } from "@/shared/types/common";

import type { BasicUser } from "../../profiles/types/user";
import type { Profile } from "@/modules/profiles/types/profile";

export type SignInResponse = CommonResponse & {
  token: string;
  user: BasicUser;
};

export type AuthContextType = {
  token: string | null;
  user: BasicUser | null;
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
