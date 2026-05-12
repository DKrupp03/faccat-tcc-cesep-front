import { useCallback, useEffect, useMemo, useState } from "react";

import type { Therapist } from "../types/therapist";
import { useTherapistForm } from "./useTherapistForm";

export const useTherapistFormState = () => {
  const { isFormOpen, therapist, submitTherapist, loadingTherapist } = useTherapistForm();

  const [uploadedPhoto, setUploadedPhoto] = useState<File>();
  const [changedPhoto, setChangedPhoto] = useState<boolean>(false);

  const photoUrl = useMemo(() => {
    if (changedPhoto) {
      return uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : undefined;
    }
    return therapist?.photo_url;
  }, [therapist?.photo_url, changedPhoto, uploadedPhoto]);

  const handleSubmit = useCallback((values: Partial<Therapist>) => {
    if (changedPhoto) {
      if (uploadedPhoto) {
        values.photo = uploadedPhoto;
      } else {
        values.remove_photo = true;
      }
    }
    submitTherapist(values);
  }, [submitTherapist, changedPhoto, uploadedPhoto]);

  useEffect(() => {
    if (isFormOpen) {
      setUploadedPhoto(undefined);
      setChangedPhoto(false);
    }
  }, [isFormOpen]);

  return {
    isFormOpen,
    therapist,
    loadingTherapist,
    uploadedPhoto,
    setUploadedPhoto,
    changedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  };
};
