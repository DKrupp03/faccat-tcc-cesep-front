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
    let messages: string[] = [];

    const sharedProps = {
      stack: { threshold: 3 },
      showProgress: true,
      pauseOnHover: true,
    };

    if (typeof text === "string") {
      notification[type]({ message, description: text, ...sharedProps });
      return;
    }

    if (Array.isArray(text)) {
      messages = text.flatMap((item) =>
        typeof item === "string" ? [item] : Object.values(item),
      );
    } else {
      messages = Object.entries(text).flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map((msg) => `${t(`common.columns.${key}`)}: ${msg}`)
          : [`${t(`common.columns.${key}`)}: ${value}`],
      );
    }

    messages.forEach((description) => {
      notification[type]({ message, description, ...sharedProps });
    });
  };

  return { openNotification };
};
