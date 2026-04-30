import { createContext } from "react";

import type { Profile, ProfileRole } from "../types/profile";

export type ProfilesFormContextType = {
  isFormOpen: boolean;
  profile: Profile | undefined;
  editingRole: ProfileRole | undefined;
  isSubmitting: boolean;
  loadingProfile: boolean;
  openForm: (role: ProfileRole, profileId?: number) => void;
  closeForm: () => void;
  submitProfile: (values: Partial<Profile>) => void;
  deleteProfile: (profileId: number) => void;
};

export const ProfilesFormContext = createContext<ProfilesFormContextType | null>(null);
