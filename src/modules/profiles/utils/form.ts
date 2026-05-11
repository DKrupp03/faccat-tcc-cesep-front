import type { TFunction } from "i18next";

export const getGenderOptions = (t: TFunction) => [
  { value: "male", label: t("profiles.genders.male") },
  { value: "female", label: t("profiles.genders.female") },
  { value: "other", label: t("profiles.genders.other") },
];

export const getMaritalStatusOptions = (t: TFunction) => [
  { value: "single", label: t("profiles.maritalStatus.single") },
  { value: "married", label: t("profiles.maritalStatus.married") },
  { value: "divorced", label: t("profiles.maritalStatus.divorced") },
  { value: "widowed", label: t("profiles.maritalStatus.widowed") },
];

export const getEducationLevelOptions = (t: TFunction) => [
  { value: "elementary_incomplete", label: t("profiles.educationLevels.elementaryIncomplete") },
  { value: "elementary_complete", label: t("profiles.educationLevels.elementaryComplete") },
  { value: "high_school_incomplete", label: t("profiles.educationLevels.highSchoolIncomplete") },
  { value: "high_school_complete", label: t("profiles.educationLevels.highSchoolComplete") },
  { value: "technical", label: t("profiles.educationLevels.technical") },
  { value: "higher_education_incomplete", label: t("profiles.educationLevels.higherEducationIncomplete") },
  { value: "higher_education_complete", label: t("profiles.educationLevels.higherEducationComplete") },
  { value: "postgraduate", label: t("profiles.educationLevels.postgraduate") },
  { value: "masters", label: t("profiles.educationLevels.masters") },
  { value: "doctorate", label: t("profiles.educationLevels.doctorate") },
];
