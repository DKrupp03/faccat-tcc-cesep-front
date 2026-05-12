import type { Profile, ProfileGender, ProfileEducationLevel, ProfileMaritalStatus } from "./profile";

export type AnamneseProfileType = "child" | "adolescent" | "adult";

export type AnamneseIdentificationDataType = {
  name: string;
  informant: string;
  birth: string;
  age: number;
  gender: ProfileGender;
  educationLevel: ProfileEducationLevel;
  maritalStatus: ProfileMaritalStatus;
  relationStatus: "single" | "dating";
};

export type AnemneseFamilyType = {
  responsibles: {
    responsible: string;
    age: number;
    occupation: string;
    educationLevel: ProfileEducationLevel;
    maritalStatus: ProfileMaritalStatus;
  }[];
  brothers: {
    name: string;
    age: number;
  }[];
  children: {
    name: string;
    age: number;
  }[];
  spouse: {
    has: 0 | 1;
    name: string;
    age: number;
  };
  liveWith: string;
  genome: string;
};

export type AnemneseReasonType = {
  mainComplaint: string;
  evolution: string;
  effects: string;
  feeling: string;
};

export type AnamnesePreviousHistoryType = {
  gestation: {
    planned: 0 | 1;
    desired: 0 | 1;
    prenatal: 0 | 1;
    motherConditions: string;
  };
  abortions: {
    happened: 0 | 1;
    howMany: number;
    cause: string;
  };
  childbirth: {
    type: "normal" | "cesarian";
    howMany: number;
    cause: string;
    weeks: number;
    apgar: string;
    parentsReaction: string;
    postpartumDepression: string;
  };
  adultInfo: {
    notableEvents: string;
    development: string;
    schoolJourney: string;
    socialRelations: string;
    hospitalizations: string;
  };
};

export type AnemnesePubertyType = {
  socialRelations: string;
  schoolHistory: string;
  problems: string;
};

export type AnamenseAdulthoodType = {
  studies: string;
  occupationChoice: string;
  currentSituation: string;
  colleaguesRelationships: string;
  numberOfJobs: string;
  jobSatisfaction: string;
  intimateRelationships: string;
  friends: string;
  relateAbility: string;
};

export type AnamneseMatureAgeType = {
  physicalChanges: string;
  adversities: string;
  aging: string;
};

export type AnamneseDevelopmentType = {
  breastFeeding: string;
  crawlingWalking: string;
  sphincterControl: string;
  language: string;
  socialRelations: string;
  socialRelationsBeginning: string;
  losses: string;
  dependence: string;
  alone: string;
  help: string;
  event: string;
};

export type AnamneseSchoolHistoryType = {
  entry: string;
  difficulties: string;
  repetition: string;
  interpersonalRelationships: string;
};

export type AnamneseOccupationHistory = {
  jobInfos: string;
};

export type AnamneseClinicalHistoryType = {
  illnesses: string;
  medicine: {
    which: string;
    dosage: string;
    since: string;
    interruptionReason: string;
  };
  hospitalizations: string;
  chemicalSubstances: string;
  specialists: {
    happened: string;
    professionalsNames: string;
    reason: string;
    since: string;
    interruptionReason: string;
  };
  familiars: {
    happenedDiagnosis: 0 | 1;
    whichDiagnosis: string;
    kinshipDiagnosis: string;
    happenedSymptom: 0 | 1;
    whichSymptom: string;
    kinshipSymptom: string;
  };
};

export type AnamneseCurrentMomentType = {
  basicFunctions: {
    sleep: string;
    food: string;
    higiene: string;
    socialConditions: string;
    foodDificulties: string;
  };
  religion: {
    family: string;
    adolescent: string;
  };
};

export type AnamneseFamilyHistoryType = {
  responsiblesRelation: string;
  brothersRelation: string;
  frustrationsDealing: string;
  brothersBirth: string;
  membersConflicts: string;
  parentsDependency: string;
  familiars: {
    happenedDiagnosis: string;
    whichDiagnosis: string;
    kinshipDiagnosis: string;
    happenedSymptom: string;
    whichSymptom: string;
    kinshipSymptom: string;
  };
};

export type AnamneseDomesticEnvironmentType = {
  house: string;
  whereSleep: string;
  whereLike: string;
  tasks: string;
  privacy: string;
};

export type AnamneseSocialRelationsType = {
  friendships: string;
  loveRelationships: string;
  behaviorChanges: string;
};

export type AnamneseAdolescentIssuesType = {
  inferiorityFeelings: string;
  eatingDisorders: string;
  suicide: string;
  seeThings: string;
  rebellion: string;
  homeScapes: string;
  drugs: string;
  parentsReaction: string;
};

export type AnamneseForInterviewerType = {
  relevantInfos: string;
  impressions: string;
};

export type AnamneseDataType = {
  identificationData: AnamneseIdentificationDataType;
  family: AnemneseFamilyType;
  reason: AnemneseReasonType;
  previousHistory: AnamnesePreviousHistoryType;
  puberty: AnemnesePubertyType;
  adulthood: AnamenseAdulthoodType;
  matureAge: AnamneseMatureAgeType;
  development: AnamneseDevelopmentType;
  schoolHistory: AnamneseSchoolHistoryType;
  occupationHistory: AnamneseOccupationHistory;
  clinicalHistory: AnamneseClinicalHistoryType;
  currentMoment: AnamneseCurrentMomentType;
  familyHistory: AnamneseFamilyHistoryType;
  domesticEnvironment: AnamneseDomesticEnvironmentType;
  socialRelations: AnamneseSocialRelationsType;
  adolescentIssues: AnamneseAdolescentIssuesType;
  weeklyRoutine: string;
  forInterviewer: AnamneseForInterviewerType;
};

export type AnamneseType = {
  id: number;
  anamnese_type: AnamneseProfileType;
  anamnese_data: AnamneseDataType;
  observations: string;
  patient_id: number;
  therapist_id: number;
  created_at: string;
  patient?: Profile;
  therapist?: Profile;
};