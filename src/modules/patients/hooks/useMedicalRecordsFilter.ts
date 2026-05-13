import { useCallback, useEffect } from "react";
import { Form } from "antd";

import { useMedicalRecords } from "./useMedicalRecords";
import type { MedicalRecordsFilter } from "../types/medicalRecord";

export const useMedicalRecordsFilter = () => {
  const {
    isFilterOpen,
    filter,
    defaultFilter,
    filtratePanel,
    closeFilter,
  } = useMedicalRecords();

  const [form] = Form.useForm<MedicalRecordsFilter>();

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
