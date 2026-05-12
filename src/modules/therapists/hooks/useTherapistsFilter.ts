import { useCallback, useEffect } from "react";
import { Form } from "antd";

import { useTherapistsList } from "./useTherapistsList";
import type { TherapistsFilter } from "../types/therapist";

export const useTherapistsFilter = () => {
  const { isFilterOpen, filter, defaultFilter, filtratePanel, closeFilter } = useTherapistsList();

  const [form] = Form.useForm<TherapistsFilter>();

  const handleClear = useCallback(() => form.resetFields(), [form]);

  const handleClose = useCallback(() => closeFilter(), [closeFilter]);

  const handleFiltrate = useCallback(() => {
    const values = form.getFieldsValue(true);
    filtratePanel(values);
    handleClose();
  }, [form, filtratePanel, handleClose]);

  useEffect(() => {
    if (isFilterOpen) {
      form.setFieldsValue(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterOpen]);

  return {
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  };
};
