import api from "@/shared/api/client";
import { type CommonResponse } from "@/shared/types/common";

export const ForgotPasswordService = {
  async requestPasswordRecover(email: string): Promise<CommonResponse> {
    const response = await api.post("/password", {
      user: { email },
    });

    return response.data;
  },
};
