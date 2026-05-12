import type { TFunction } from "i18next";

export const getGenderOptions = (t: TFunction) => [
  { value: "male", label: t("common.genders.male") },
  { value: "female", label: t("common.genders.female") },
  { value: "other", label: t("common.genders.other") },
];

export const getMaritalStatusOptions = (t: TFunction) => [
  { value: "single", label: t("common.maritalStatus.single") },
  { value: "married", label: t("common.maritalStatus.married") },
  { value: "divorced", label: t("common.maritalStatus.divorced") },
  { value: "widowed", label: t("common.maritalStatus.widowed") },
];

export const getEducationLevelOptions = (t: TFunction) => [
  { value: "elementary_incomplete", label: t("common.educationLevels.elementaryIncomplete") },
  { value: "elementary_complete", label: t("common.educationLevels.elementaryComplete") },
  { value: "high_school_incomplete", label: t("common.educationLevels.highSchoolIncomplete") },
  { value: "high_school_complete", label: t("common.educationLevels.highSchoolComplete") },
  { value: "technical", label: t("common.educationLevels.technical") },
  { value: "higher_education_incomplete", label: t("common.educationLevels.higherEducationIncomplete") },
  { value: "higher_education_complete", label: t("common.educationLevels.higherEducationComplete") },
  { value: "postgraduate", label: t("common.educationLevels.postgraduate") },
  { value: "masters", label: t("common.educationLevels.masters") },
  { value: "doctorate", label: t("common.educationLevels.doctorate") },
];
