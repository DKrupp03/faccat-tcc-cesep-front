import { useTranslation } from "react-i18next";
import { App } from "antd";

import { type ErrorsType } from "../types/common";

export const useNotification = () => {
  const { t } = useTranslation();
  const { notification } = App.useApp();

  const openNotification = (
    type: "success" | "error" | "warning" | "info",
    text: string | ErrorsType,
    title?: string,
  ) => {
    const message = title || t(`common.notifications.${type}`);

    if (typeof text === "string") {
      notification[type]({ message, description: text });
      return;
    }

    const messages = text.flatMap((item) =>
      typeof item === "string" ? [item] : Object.values(item),
    );

    messages.forEach((description) => {
      notification[type]({ message, description });
    });
  };

  return { openNotification };
};
