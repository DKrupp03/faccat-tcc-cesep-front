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

    const sharedProps = {
      stack: { threshold: 3 },
      showProgress: true,
      pauseOnHover: true,
    };

    if (typeof text === "string") {
      notification[type]({ message, description: text, ...sharedProps });
      return;
    }

    text.forEach((description) => {
      notification[type]({ message, description, ...sharedProps });
    });
  };

  return { openNotification };
};
