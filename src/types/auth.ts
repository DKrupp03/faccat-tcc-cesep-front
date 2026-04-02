import { type CommonResponse } from "./common";

export type SignInResponse = CommonResponse & {
  token: string;
  user: {
    id: number;
    email: string;
  };
};

export type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};