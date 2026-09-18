import { useCallback, useEffect } from "react";
import { Form } from "antd";

import { useServicesList } from "./useServicesList";
import type { ServicesFilter } from "../types/service";

export const useServicesFilter = () => {
  const { isFilterOpen, filter, defaultFilter, filtratePanel, closeFilter } = useServicesList();

  const [form] = Form.useForm<ServicesFilter>();

  // Limpar precisa refletir no painel: antes só zerava o formulário e a
  // listagem seguia com o filtro anterior até o usuário clicar em "Filtrar".
  const handleClear = useCallback(() => {
    form.resetFields();
    filtratePanel(defaultFilter);
    closeFilter();
  }, [form, filtratePanel, defaultFilter, closeFilter]);

  const handleClose = useCallback(() => closeFilter(), [closeFilter]);

  // Valida antes de aplicar: o intervalo invertido passava direto e a listagem
  // voltava vazia sem explicação. A leitura segue por `getFieldsValue(true)`,
  // porque `validateFields` devolveria só os campos montados.
  const handleFiltrate = useCallback(async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    filtratePanel(form.getFieldsValue(true));
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
