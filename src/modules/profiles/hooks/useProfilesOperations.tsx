import { useCallback } from "react";

import type {
  ProfilesFilter,
  ProfilesPayload,
  ProfilesOrder,
} from "../types/profile";
import ProfilesService from "@/modules/profiles/services/ProfilesService";

export const useProfilesOperations = () => {
  const createProfile = useCallback(() => {

  }, []);

  const updateProfile = useCallback(() => {

  }, []);

  const deleteProfile = useCallback(() => {

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
