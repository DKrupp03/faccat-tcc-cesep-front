export const PATHS = {
  login: "/login",
  forgotPassword: "/login/forgot-password",
  resetPassword: "/login/reset-password",
  setPassword: "/login/set-password",
  services: "/services",
  therapists: "/therapists",
  patients: "/patients",
  payments: "/payments",
} as const;

export const DEFAULT_PATH = PATHS.services;
