import { type CommonResponse } from "./common";

import type { BasicUser } from "./user";
import type { Profile } from "./profile";

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
  logout: () => void;
};