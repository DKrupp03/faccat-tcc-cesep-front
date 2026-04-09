import api from "@/shared/api/client";
import { type CommonResponse } from "@/shared/types/common";

import { type SignInResponse } from "../types/auth";

export const AuthService = {
  async signIn(email: string, password: string): Promise<SignInResponse> {
    const response = await api.post("/login", {
      user: { email, password },
    });

    const token = response.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token not found in response");
    }

    return { token, ...response.data };
  },

  async signOut(): Promise<void> {
    await api.delete("/logout");
  },

  async requestPasswordRecover(email: string): Promise<CommonResponse> {
    const response = await api.post("/password", {
      user: { email },
    });

    return response.data;
  },

  async resetPassword(
    password: string,
    passwordConfirmation: string,
    token: string,
  ): Promise<CommonResponse> {
    const response = await api.put("/password", {
      user: {
        password,
        password_confirmation: passwordConfirmation,
        reset_password_token: token,
      },
    });

    return response.data;
  },
};
