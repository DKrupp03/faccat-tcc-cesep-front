import { useCallback, useEffect, useMemo, useState } from "react";

import type { Patient } from "../types/patient";
import { usePatientForm } from "./usePatientForm";

export const usePatientFormState = () => {
  const { isFormOpen, patient, submitPatient, loadingPatient } = usePatientForm();

  const [uploadedPhoto, setUploadedPhoto] = useState<File>();
  const [changedPhoto, setChangedPhoto] = useState<boolean>(false);

  const photoUrl = useMemo(() => {
    if (changedPhoto) {
      return uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : undefined;
    }
    return patient?.photo_url;
  }, [patient?.photo_url, changedPhoto, uploadedPhoto]);

  const handleSubmit = useCallback((values: Partial<Patient>) => {
    if (changedPhoto) {
      if (uploadedPhoto) {
        values.photo = uploadedPhoto;
      } else {
        values.remove_photo = true;
      }
    }
    submitPatient(values);
  }, [submitPatient, changedPhoto, uploadedPhoto]);

  useEffect(() => {
    if (isFormOpen) {
      setUploadedPhoto(undefined);
      setChangedPhoto(false);
    }
  }, [isFormOpen]);

  return {
    isFormOpen,
    patient,
    loadingPatient,
    uploadedPhoto,
    setUploadedPhoto,
    changedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  };
};
