import api from "@/shared/api/client";
import { type CommonResponse } from "@/shared/types/common";

import { type SignInResponse, type RegisterPayload } from "../types/auth";

export const AuthService = {
  async signIn(email: string, password: string): Promise<SignInResponse> {
    // O JWT é entregue pelo servidor em cookie HttpOnly; o corpo traz o usuário.
    const response = await api.post("/login", {
      user: { email, password },
    });

    return response.data;
  },

  // Reidrata a sessão a partir do cookie (usuário atual). 401 → não autenticado.
  async getCurrentUser(): Promise<SignInResponse> {
    const response = await api.get("/me");

    return response.data;
  },

  async register(profile: RegisterPayload): Promise<CommonResponse> {
    const response = await api.post("/signup", {
      user: { email: profile.email, profile },
    });

    return response.data;
  },

  async logout(): Promise<CommonResponse> {
    const response = await api.delete("/logout");

    return response.data;
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
