import React from "react";
import { Button, type ButtonProps, ConfigProvider } from "antd";

import { TOKENS } from "../../theme";

import styles from "./CommonButton.module.css";

const { color: C, radius: R, shadow: S } = TOKENS;

export type CommonButtonProps = ButtonProps & {
  outline?: boolean;
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

type Variant = {
  bgColor: string;
  bgColorHover: string;
  textColor: string;
  textColorHover: string;
  shadow?: string;
  shadowHover?: string;
};

// Padrão C: sem bordas; profundidade por fundo e sombra.
// "outline" = superfície branca com sombra leve; cheio = fundo sólido ou suave.
const getVariant = (
  buttonVariant: NonNullable<CommonButtonProps["buttonVariant"]>,
  outline: boolean,
  iconOnly: boolean,
): Variant => {
  const raised = { shadow: S.sm, shadowHover: S.hover };

  switch (buttonVariant) {
    case "primary":
    case "success":
      return outline
        ? { bgColor: C.surface, bgColorHover: C.surface, textColor: C.accent, textColorHover: C.accentHover, ...raised }
        : { bgColor: C.accent, bgColorHover: C.accentHover, textColor: C.textInverse, textColorHover: C.textInverse };
    case "danger":
      if (outline) {
        return { bgColor: C.surface, bgColorHover: C.dangerBg, textColor: C.danger, textColorHover: C.danger, shadow: S.sm };
      }
      return iconOnly
        ? { bgColor: C.dangerBg, bgColorHover: C.dangerBgHover, textColor: C.danger, textColorHover: C.danger }
        : { bgColor: C.danger, bgColorHover: C.dangerHover, textColor: C.textInverse, textColorHover: C.textInverse };
    case "info":
      return outline
        ? { bgColor: C.surface, bgColorHover: C.infoBg, textColor: C.info, textColorHover: C.info, shadow: S.sm }
        : { bgColor: C.info, bgColorHover: C.ink, textColor: C.textInverse, textColorHover: C.textInverse };
    case "noBorder":
      return { bgColor: "transparent", bgColorHover: C.bg, textColor: C.text, textColorHover: C.ink };
    case "outline":
    default:
      return outline
        ? { bgColor: C.surface, bgColorHover: C.surface, textColor: C.textSecondary, textColorHover: C.ink, ...raised }
        : { bgColor: C.fieldBg, bgColorHover: C.border, textColor: C.text, textColorHover: C.ink };
  }
};

export const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  icon,
  htmlType,
  buttonVariant = "outline",
  outline = false,
  disabled = false,
  hoverEffect = true,
  contentAlign = "center",
  style,
  ...props
}) => {
  const variant = getVariant(buttonVariant, outline, !children && !!icon);
  const hover = <T,>(value: T, hoverValue: T) => (hoverEffect ? hoverValue : value);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeightLG: 48,
            controlHeight: 40,
            controlHeightSM: 28,
            fontWeight: TOKENS.font.weight.semibold,
            contentFontSize: TOKENS.font.size.md,
            contentFontSizeSM: TOKENS.font.size.sm,
            contentFontSizeLG: TOKENS.font.size.base,
            defaultBg: variant.bgColor,
            defaultColor: variant.textColor,
            defaultBorderColor: "transparent",
            defaultHoverBg: hover(variant.bgColor, variant.bgColorHover),
            defaultHoverColor: hover(variant.textColor, variant.textColorHover),
            defaultHoverBorderColor: "transparent",
            defaultActiveBg: hover(variant.bgColor, variant.bgColorHover),
            defaultActiveColor: hover(variant.textColor, variant.textColorHover),
            defaultActiveBorderColor: "transparent",
            borderColorDisabled: "transparent",
            borderRadiusSM: R.sm,
            borderRadius: R.lg,
            borderRadiusLG: R.lg,
          },
        },
      }}
    >
      <Button
        disabled={disabled}
        htmlType={htmlType}
        icon={icon}
        className={styles.button}
        style={{
          justifyContent: contentAlign,
          "--button-shadow": variant.shadow ?? "none",
          "--button-shadow-hover": hover(variant.shadow, variant.shadowHover ?? variant.shadow) ?? "none",
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
