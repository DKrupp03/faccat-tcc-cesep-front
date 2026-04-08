import api from "../../../shared/api/client";
import { type SignInResponse } from "../types/auth";

const AuthService = {
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
};

export default AuthService;
