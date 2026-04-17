import { type CommonResponse } from "@/shared/types/common";

import type { BasicUser } from "./user";
import type { Profile } from "@/modules/auth/types/profile";

export type SignInResponse = CommonResponse & {
  token: string;
  user: BasicUser;
};

export type AuthContextType = {
  token: string | null;
  user: BasicUser | null;
  profile: Profile | null;
isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
