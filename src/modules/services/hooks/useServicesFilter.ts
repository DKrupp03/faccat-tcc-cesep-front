import { useCallback, useEffect } from "react";
import { Form } from "antd";

import { useServicesList } from "./useServicesList";
import type { ServicesFilter } from "../types/service";

export const useServicesFilter = () => {
  const { isFilterOpen, filter, defaultFilter, filtratePanel, closeFilter } = useServicesList();

  const [form] = Form.useForm<ServicesFilter>();

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
