import React from "react";
import { Button, type ButtonProps, ConfigProvider } from "antd";

import { COLORS } from "../../theme";

import styles from "./CommonButton.module.css";

type CommonButtonProps = ButtonProps & {
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
      backgroundColor: COLORS.primary.main,
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.primary.grey,
      disabledBackgroundColor: COLORS.primary.outline,
      disabledBorderColor: "transparent",
    },
    outline: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.primary.outline,
      textColor: COLORS.primary.grey,
      disabledTextColor: COLORS.primary.outline,
      disabledBackgroundColor: "transparent",
      disabledBorderColor: COLORS.primary.outline,
    },
    success: {
      backgroundColor: COLORS.secondary.green,
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.primary.grey,
      disabledBackgroundColor: COLORS.primary.outline,
      disabledBorderColor: "transparent",
    },
    danger: {
      backgroundColor: COLORS.secondary.red,
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.primary.grey,
      disabledBackgroundColor: COLORS.primary.outline,
      disabledBorderColor: "transparent",
    },
    info: {
      backgroundColor: COLORS.secondary.cyan,
      borderColor: "transparent",
      textColor: COLORS.white,
      disabledTextColor: COLORS.primary.grey,
      disabledBackgroundColor: COLORS.primary.outline,
      disabledBorderColor: "transparent",
    },
    edit: {
      backgroundColor: COLORS.white,
      borderColor: "transparent",
      textColor: COLORS.primary.grey,
      disabledTextColor: COLORS.primary.outline,
      disabledBackgroundColor: "transparent",
      disabledBorderColor: "transparent",
      hoverBg: COLORS.primary.outline,
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
  const hoverBorderColor = COLORS.primary.grey;

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
