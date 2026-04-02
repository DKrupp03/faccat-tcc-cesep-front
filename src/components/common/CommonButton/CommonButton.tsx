import React from "react";
import { Button, type ButtonProps, ConfigProvider } from "antd";

import { colors } from "../../../theme";

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
      backgroundColor: colors.primary[500],
      borderColor: "transparent",
      textColor: colors.white,
      disabledTextColor: colors.gray[300],
      disabledBackgroundColor: colors.gray[200],
      disabledBorderColor: "transparent",
    },
    outline: {
      backgroundColor: colors.white,
      borderColor: colors.gray[200],
      textColor: colors.gray[300],
      disabledTextColor: colors.gray[200],
      disabledBackgroundColor: "transparent",
      disabledBorderColor: colors.gray[200],
    },
    success: {
      backgroundColor: colors.green[500],
      borderColor: "transparent",
      textColor: colors.white,
      disabledTextColor: colors.gray[300],
      disabledBackgroundColor: colors.gray[200],
      disabledBorderColor: "transparent",
    },
    danger: {
      backgroundColor: colors.red[500],
      borderColor: "transparent",
      textColor: colors.white,
      disabledTextColor: colors.gray[300],
      disabledBackgroundColor: colors.gray[200],
      disabledBorderColor: "transparent",
    },
    info: {
      backgroundColor: colors.primary[200],
      borderColor: "transparent",
      textColor: colors.white,
      disabledTextColor: colors.gray[300],
      disabledBackgroundColor: colors.gray[200],
      disabledBorderColor: "transparent",
    },
    edit: {
      backgroundColor: colors.white,
      borderColor: "transparent",
      textColor: colors.gray[300],
      disabledTextColor: colors.gray[200],
      disabledBackgroundColor: "transparent",
      disabledBorderColor: "transparent",
      hoverBg: colors.gray[200],
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
  const hoverBorderColor = colors.gray[300];

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
        {...props}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};