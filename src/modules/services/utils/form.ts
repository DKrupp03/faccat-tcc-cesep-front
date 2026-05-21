import type { TFunction } from "i18next";

import type { ServiceStatus, ServiceType } from "../types/service";

const SERVICE_STATUSES: ServiceStatus[] = [
  "scheduled",
  "confirmed",
  "attended",
  "no_show",
  "cancelled",
];

const SERVICE_TYPES: ServiceType[] = [
  "clinical_psychology_tcc",
  "clinical_psychology_psychoanalysis",
  "clinical_psychology_systemic",
  "clinical_psychology_humanistic",
  "psychological_emergency_care",
  "school_psychology",
  "forensic_psychology",
  "community_psychology",
  "emergency_and_disaster_psychology",
  "organizational_psychology_career_guidance",
  "organizational_psychology_worker_health",
];

export const getStatusOptions = (t: TFunction) =>
  SERVICE_STATUSES.map((status) => ({
    value: status,
    label: t(`services.status.${status}`),
  }));

export const getServiceTypeOptions = (t: TFunction) =>
  SERVICE_TYPES.map((type) => ({
    value: type,
    label: t(`services.serviceTypes.${type}`),
  }));
