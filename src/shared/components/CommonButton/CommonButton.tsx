import React from "react";
import { Button, type ButtonProps, ConfigProvider } from "antd";

import { COLORS } from "../../theme";

import styles from "./CommonButton.module.css";

export type CommonButtonProps = ButtonProps & {
  outline?: boolean;
  circular?: boolean;
  hoverEffect?: boolean;
  contentAlign?: "flex-start" | "center" | "flex-end";
  buttonVariant?:
  | "primary"
  | "outline"
  | "noBorder"
  | "success"
  | "danger"
  | "info";
};

export const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  icon,
  htmlType,
  buttonVariant = "outline",
  circular = false,
  outline = false,
  disabled = false,
  hoverEffect = true,
  contentAlign = "center",
  style,
  ...props
}) => {
  const variants: {
    [key: string]: {
      bgColor: string;
      bgColorHover: string;
      borderColor: string;
      borderColorHover: string;
      textColor: string;
      textColorHover: string;
    };
  } = {
    primary: {
      bgColor: outline ? COLORS.white : COLORS.blue,
      bgColorHover: outline ? COLORS.white : COLORS.blueHover,
      borderColor: outline ? COLORS.blue : "transparent",
      borderColorHover: outline ? COLORS.blueHover : "transparent",
      textColor: outline ? COLORS.blue : COLORS.white,
      textColorHover: outline ? COLORS.blueHover : COLORS.white,
    },
    outline: {
      bgColor: outline ? COLORS.white : COLORS.grey30,
      bgColorHover: outline ? COLORS.white : COLORS.grey50,
      borderColor: outline ? COLORS.grey30 : "transparent",
      borderColorHover: outline ? COLORS.grey50 : "transparent",
      textColor: COLORS.grey70,
      textColorHover: COLORS.grey90,
    },
    noBorder: {
      bgColor: COLORS.white,
      bgColorHover: COLORS.white,
      borderColor: "transparent",
      borderColorHover: COLORS.grey30,
      textColor: COLORS.grey70,
      textColorHover: COLORS.grey90,
    },
    success: {
      bgColor: outline ? COLORS.white : COLORS.gren,
      bgColorHover: outline ? COLORS.white : COLORS.grenHover,
      borderColor: outline ? COLORS.gren : "transparent",
      borderColorHover: outline ? COLORS.grenHover : "transparent",
      textColor: outline ? COLORS.gren : COLORS.white,
      textColorHover: outline ? COLORS.grenHover : COLORS.white,
    },
    danger: {
      bgColor: outline ? COLORS.white : COLORS.red,
      bgColorHover: outline ? COLORS.white : COLORS.redHover,
      borderColor: outline ? COLORS.red : "transparent",
      borderColorHover: outline ? COLORS.redHover : "transparent",
      textColor: outline ? COLORS.red : COLORS.white,
      textColorHover: outline ? COLORS.redHover : COLORS.white,
    },
    info: {
      bgColor: outline ? COLORS.white : COLORS.blue,
      bgColorHover: outline ? COLORS.white : COLORS.navy,
      borderColor: outline ? COLORS.blue : "transparent",
      borderColorHover: outline ? COLORS.navy : "transparent",
      textColor: outline ? COLORS.blue : COLORS.white,
      textColorHover: outline ? COLORS.navy : COLORS.white,
    },
  };

  const variant = variants[buttonVariant];

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: variant.bgColor,
            defaultColor: variant.textColor,
            defaultBorderColor: variant.borderColor,
            defaultHoverBg: hoverEffect ? variant.bgColorHover : variant.bgColor,
            defaultHoverColor: hoverEffect ? variant.textColorHover : variant.textColor,
            defaultHoverBorderColor: hoverEffect ? variant.borderColorHover : variant.borderColor,
            defaultActiveBg: hoverEffect ? variant.bgColorHover : variant.bgColor,
            defaultActiveColor: hoverEffect ? variant.textColorHover : variant.textColor,
            defaultActiveBorderColor: hoverEffect ? variant.borderColorHover : variant.borderColor,
            borderRadiusSM: circular ? 32 : 4,
            borderRadius: circular ? 40 : 6,
            borderRadiusLG: circular ? 50 : 8,
          },
        },
      }}
    >
      <Button
        disabled={disabled}
        htmlType={htmlType}
        icon={icon}
        className={styles.button}
        style={{ justifyContent: contentAlign, ...style }}
        {...props}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
