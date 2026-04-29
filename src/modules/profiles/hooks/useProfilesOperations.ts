import { useCallback } from "react";

import type {
  ProfilesFilter,
  ProfilesPayload,
  ProfilesOrder,
  Profile,
  ProfileSubmitPayload,
} from "../types/profile";
import ProfilesService from "@/modules/profiles/services/ProfilesService";

export const useProfilesOperations = () => {
  const createProfile = useCallback(async (profile: Partial<Profile>) => {
    if (profile.role === "patient") {
      return await ProfilesService.createPatientProfile(profile);
    }

    const payload: ProfileSubmitPayload = {
      email: profile.email!,
      profile,
    };

    return await ProfilesService.createProfile(payload);
  }, []);

  const updateProfile = useCallback(async (profile: Partial<Profile>) => {
    return await ProfilesService.updateProfile(profile);
  }, []);

  const deleteProfile = useCallback(async (profileId: number) => {
    return await ProfilesService.deleteProfile(profileId);
  }, []);

  const fetchProfile = useCallback(async (profileId: number) => {
    return await ProfilesService.getProfile(profileId);
  }, []);

  const fetchProfiles = useCallback(async (
    filter: ProfilesFilter,
    orderBy: ProfilesOrder = "name_asc",
    page?: number,
    perPage?: number,
  ) => {
    const payload: ProfilesPayload = {
      profiles: filter,
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await ProfilesService.getProfiles(payload);
  }, []);

  return {
    createProfile,
    updateProfile,
    deleteProfile,
    fetchProfile,
    fetchProfiles,
  };
};
