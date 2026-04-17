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
  | "info";
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
      bgColor: string;
      bgColorHover: string;
      borderColor: string;
      borderColorHover: string;
      textColor: string;
      textColorHover: string;
    };
  } = {
    primary: {
      bgColor: outline ? COLORS.white : COLORS.primary.main,
      bgColorHover: outline ? COLORS.white : COLORS.primary.mainHover,
      borderColor: outline ? COLORS.primary.main : "trasparent",
      borderColorHover: outline ? COLORS.primary.mainHover : "trasparent",
      textColor: outline ? COLORS.primary.main : COLORS.white,
      textColorHover: outline ? COLORS.primary.mainHover : COLORS.white,
    },
    outline: {
      bgColor: outline ? COLORS.white : COLORS.primary.outline,
      bgColorHover: outline ? COLORS.white : COLORS.primary.outlineHover,
      borderColor: outline ? COLORS.primary.outline : "trasparent",
      borderColorHover: outline ? COLORS.primary.greyHover : "trasparent",
      textColor: COLORS.primary.grey,
      textColorHover: COLORS.primary.greyHover,
    },
    success: {
      bgColor: outline ? COLORS.white : COLORS.secondary.green,
      bgColorHover: outline ? COLORS.white : COLORS.secondary.greenHover,
      borderColor: outline ? COLORS.secondary.green : "trasparent",
      borderColorHover: outline ? COLORS.secondary.greenHover : "trasparent",
      textColor: outline ? COLORS.secondary.green : COLORS.white,
      textColorHover: outline ? COLORS.secondary.greenHover : COLORS.white,
    },
    danger: {
      bgColor: outline ? COLORS.white : COLORS.secondary.red,
      bgColorHover: outline ? COLORS.white : COLORS.secondary.redHover,
      borderColor: outline ? COLORS.secondary.red : "trasparent",
      borderColorHover: outline ? COLORS.secondary.redHover : "trasparent",
      textColor: outline ? COLORS.secondary.red : COLORS.white,
      textColorHover: outline ? COLORS.secondary.redHover : COLORS.white,
    },
    info: {
      bgColor: outline ? COLORS.white : COLORS.secondary.cyan,
      bgColorHover: outline ? COLORS.white : COLORS.secondary.cyanHover,
      borderColor: outline ? COLORS.secondary.cyan : "trasparent",
      borderColorHover: outline ? COLORS.secondary.cyanHover : "trasparent",
      textColor: outline ? COLORS.secondary.cyan : COLORS.white,
      textColorHover: outline ? COLORS.secondary.cyanHover : COLORS.white,
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
            defaultHoverBg: variant.bgColorHover,
            defaultHoverColor: variant.textColorHover,
            defaultHoverBorderColor: variant.borderColorHover,
            defaultActiveBg: variant.bgColorHover,
            defaultActiveColor: variant.textColorHover,
            defaultActiveBorderColor: variant.borderColorHover,
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
