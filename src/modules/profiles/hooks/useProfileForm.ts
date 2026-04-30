import { useCallback, useEffect, useMemo, useState } from "react";

import type { Profile } from "../types/profile";
import { useProfilesForm } from "./useProfilesForm";

export const useProfileForm = () => {
  const { isFormOpen, editingRole, profile, submitProfile, loadingProfile } = useProfilesForm();

  const [uploadedPhoto, setUploadedPhoto] = useState<File>();
  const [changedPhoto, setChangedPhoto] = useState<boolean>(false);

  const photoUrl = useMemo(() => {
    if (changedPhoto) {
      return uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : undefined;
    }
    return profile?.photo_url;
  }, [profile?.photo_url, changedPhoto, uploadedPhoto]);

  const handleSubmit = useCallback((values: Partial<Profile>) => {
    if (changedPhoto) {
      if (uploadedPhoto) {
        values.photo = uploadedPhoto;
      } else {
        values.remove_photo = true;
      }
    }
    submitProfile(values);
  }, [submitProfile, changedPhoto, uploadedPhoto]);

  useEffect(() => {
    if (isFormOpen) {
      setUploadedPhoto(undefined);
      setChangedPhoto(false);
    }
  }, [isFormOpen]);

  return {
    isFormOpen,
    editingRole,
    profile,
    loadingProfile,
    uploadedPhoto,
    setUploadedPhoto,
    changedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  };
};
