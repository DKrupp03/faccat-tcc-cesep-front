import axios from "axios";

import i18n from "@/i18n";
import { authStorage } from "@/modules/auth/utils/authStorage";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = authStorage.getToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url === "/login";

    if (error.response?.status === 401 && !isLoginRequest) {
      authStorage.clear();
      window.location.href = "/login";
    }

    return Promise.resolve(
      error.response ?? { data: { success: false, errors: [i18n.t("common.errors.generic")] } },
    );
  },
);

export default api;
