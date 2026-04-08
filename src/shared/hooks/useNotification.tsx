import { App } from "antd";

export const useNotification = () => {
  const { notification } = App.useApp();

  const openNotification = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    notification[type]({
      message: type === "success" ? "Sucesso" : "Erro",
      description: message,
    });
  };

  return { openNotification };
};
