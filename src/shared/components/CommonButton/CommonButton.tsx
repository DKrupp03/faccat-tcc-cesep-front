import React from "react";
import { Button, type ButtonProps, ConfigProvider } from "antd";

import { COLORS } from "../../theme";

import styles from "./CommonButton.module.css";

interface CommonButtonProps extends ButtonProps {
  outline?: boolean;
  buttonVariant?:
  | "primary"
  | "outline"
  | "success"
  | "danger"
  | "info"
  | "edit";
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  icon,
  htmlType,
  buttonVariant = "outline",
  outline = false,
  disabled = false,
  ...props
}) => {
  const variants: {
    [key: string]: {
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      disabledTextColor: string;
      disabledBackgroundColor: string;
      disabledBorderColor: string;
      hoverBg?: string;
      hoverColor?: string;
      activeBg?: string;
      activeColor?: string;
    };
  } = {
    primary: {
      backgroundColor: COLORS.primary[500],
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.gray[300],
      disabledBackgroundColor: COLORS.gray[200],
      disabledBorderColor: "transparent",
    },
    outline: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.gray[200],
      textColor: COLORS.gray[300],
      disabledTextColor: COLORS.gray[200],
      disabledBackgroundColor: "transparent",
      disabledBorderColor: COLORS.gray[200],
    },
    success: {
      backgroundColor: COLORS.green[500],
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.gray[300],
      disabledBackgroundColor: COLORS.gray[200],
      disabledBorderColor: "transparent",
    },
    danger: {
      backgroundColor: COLORS.red[500],
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.gray[300],
      disabledBackgroundColor: COLORS.gray[200],
      disabledBorderColor: "transparent",
    },
    info: {
      backgroundColor: COLORS.primary[200],
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.gray[300],
      disabledBackgroundColor: COLORS.gray[200],
      disabledBorderColor: "transparent",
    },
    edit: {
      backgroundColor: COLORS.white,
      borderColor: "transparent",
      textColor: COLORS.gray[300],
      disabledTextColor: COLORS.gray[200],
      disabledBackgroundColor: "transparent",
      disabledBorderColor: "transparent",
      hoverBg: COLORS.gray[200],
      hoverColor: "transparent",
    },
  };

  const variant = variants[outline ? "outline" : buttonVariant];

  const backgroundColor = disabled
    ? variant.disabledBackgroundColor
    : variant.backgroundColor;
  const textColor = disabled ? variant.disabledTextColor : variant.textColor;
  const borderColor = disabled
    ? variant.disabledBorderColor
    : variant.borderColor;

  const hoverBg = backgroundColor;
  const hoverColor = textColor;
  const activeBg = backgroundColor;
  const activeColor = textColor;
  const hoverBorderColor = COLORS.gray[300];

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: backgroundColor,
            defaultColor: textColor,
            defaultBorderColor: borderColor,
            defaultHoverBg: hoverBg,
            defaultHoverColor: hoverColor,
            defaultHoverBorderColor: hoverBorderColor,
            defaultActiveBg: activeBg,
            defaultActiveColor: activeColor,
            defaultActiveBorderColor: "transparent",
          },
        },
      }}
    >
      <Button
        disabled={disabled}
        htmlType={htmlType}
        icon={icon}
        className={styles.button}
        {...props}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
