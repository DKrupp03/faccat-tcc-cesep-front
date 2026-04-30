import { useCallback, useEffect } from "react";
import { Form } from "antd";

import { useProfilesList } from "./useProfilesList";
import type { ProfilesFilter } from "../types/profile";

export const useProfilesFilter = () => {
  const { module, isFilterOpen, filter, defaultFilter, filtratePanel, closeFilter } = useProfilesList();

  const [form] = Form.useForm<ProfilesFilter>();

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
    module,
    isFilterOpen,
    defaultFilter,
    form,
    handleClear,
    handleClose,
    handleFiltrate,
  };
};
