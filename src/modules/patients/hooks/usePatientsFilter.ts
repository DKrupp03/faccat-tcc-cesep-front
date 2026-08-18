import { useCallback, useEffect } from "react";
import { Form } from "antd";

import { usePatientsList } from "./usePatientsList";
import type { PatientsFilter } from "../types/patient";

export const usePatientsFilter = () => {
  const { isFilterOpen, filter, defaultFilter, filtratePanel, closeFilter } = usePatientsList();

  const [form] = Form.useForm<PatientsFilter>();

  // Limpar precisa refletir no painel: antes só zerava o formulário e a
  // listagem seguia com o filtro anterior até o usuário clicar em "Filtrar".
  const handleClear = useCallback(() => {
    form.resetFields();
    filtratePanel(defaultFilter);
    closeFilter();
  }, [form, filtratePanel, defaultFilter, closeFilter]);

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
