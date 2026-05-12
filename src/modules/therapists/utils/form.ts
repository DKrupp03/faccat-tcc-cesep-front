import type { TFunction } from "i18next";

export const getGenderOptions = (t: TFunction) => [
  { value: "male", label: t("common.genders.male") },
  { value: "female", label: t("common.genders.female") },
  { value: "other", label: t("common.genders.other") },
];
