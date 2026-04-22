import React from "react";
import { Button, type ButtonProps, ConfigProvider } from "antd";

import { COLORS } from "../../theme";

import styles from "./CommonButton.module.css";

type CommonButtonProps = ButtonProps & {
  outline?: boolean;
  circular?: boolean;
  hoverEffect?: boolean;
  buttonVariant?:
  | "primary"
  | "outline"
  | "success"
  | "danger"
  | "info";
};

export const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  icon,
  htmlType,
  buttonVariant = "outline",
  circular = true,
  outline = false,
  disabled = false,
  hoverEffect = true,
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
      bgColorHover: outline ? COLORS.white : COLORS.navy,
      borderColor: outline ? COLORS.blue : "transparent",
      borderColorHover: outline ? COLORS.navy : "transparent",
      textColor: outline ? COLORS.blue : COLORS.white,
      textColorHover: outline ? COLORS.navy : COLORS.white,
    },
    outline: {
      bgColor: outline ? COLORS.white : COLORS.grey30,
      bgColorHover: outline ? COLORS.white : COLORS.grey50,
      borderColor: outline ? COLORS.grey30 : "transparent",
      borderColorHover: outline ? COLORS.grey50 : "transparent",
      textColor: COLORS.grey70,
      textColorHover: COLORS.grey90,
    },
    success: {
      bgColor: outline ? COLORS.white : COLORS.gren,
      bgColorHover: outline ? COLORS.white : "#25A88D",
      borderColor: outline ? COLORS.gren : "transparent",
      borderColorHover: outline ? "#25A88D" : "transparent",
      textColor: outline ? COLORS.gren : COLORS.white,
      textColorHover: outline ? "#25A88D" : COLORS.white,
    },
    danger: {
      bgColor: outline ? COLORS.white : COLORS.pink,
      bgColorHover: outline ? COLORS.white : "#E05561",
      borderColor: outline ? COLORS.pink : "transparent",
      borderColorHover: outline ? "#E05561" : "transparent",
      textColor: outline ? COLORS.pink : COLORS.white,
      textColorHover: outline ? "#E05561" : COLORS.white,
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
        {...props}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
