import axios from "axios";

import i18n from "@/i18n";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  // Envia/recebe o cookie de sessão (JWT HttpOnly) e faz o axios anexar
  // automaticamente o header X-XSRF-TOKEN a partir do cookie XSRF-TOKEN.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // /login e /me sinalizam "não autenticado" via 401 e são tratados pelo
    // fluxo de auth — não devem disparar o redirect global (evita loop na tela
    // de login, onde o /me de reidratação retorna 401 por definição).
    const url = error.config?.url;
    const skipRedirect = url === "/login" || url === "/me";

    if (error.response?.status === 401 && !skipRedirect) {
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
