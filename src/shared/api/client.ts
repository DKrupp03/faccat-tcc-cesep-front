import axios from "axios";

import i18n from "@/i18n";
import { authStorage } from "@/modules/auth/utils/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
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

    // Contrato da API: toda chamada resolve com { data: { success, errors? }, status }.
    // Respostas do backend no padrão são repassadas; falhas sem corpo padrão
    // (rede, timeout, 5xx sem JSON) recebem um fallback genérico, garantindo que
    // os callers sempre possam checar `data.success`.
    const response = error.response;
    const hasApiContract =
      response &&
      typeof response.data === "object" &&
      response.data !== null &&
      "success" in response.data;

    if (hasApiContract) {
      return Promise.resolve(response);
    }

    return Promise.resolve({
      ...response,
      status: response?.status ?? 0,
      data: { success: false, errors: [i18n.t("common.errors.generic")] },
    });
  },
);

export default api;
