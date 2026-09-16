// Design tokens — Sistema CESEP, padrão C ("Neutro acolhedor").
// Espelha src/shared/tokens.css. Ao alterar um valor aqui, altere também lá.
export const TOKENS = {
  color: {
    ink: "#1F2421",
    text: "#4A453C",
    textSecondary: "#6B6459",
    textMuted: "#6E6760",
    textInverse: "#FFFFFF",

    bg: "#F6F4F1",
    surface: "#FFFFFF",
    surfaceSubtle: "#FBFAF8",
    surfaceHover: "#FAF8F6",
    fieldBg: "#F6F4F1",

    rail: "#F1EEE9",
    railHover: "#E8E3DB",
    neutralSoft: "#E2DED6",

    border: "#EDE9E3",
    borderSubtle: "#F4F1EC",
    borderStrong: "#E8E3DB",

    overlay: "rgba(36, 31, 27, 0.32)",

    accent: "#2F6F62",
    accentHover: "#255A4F",
    accentSoft: "#E9EEEB",
    accentSoftHover: "#E1EBE7",
    accentSubtle: "#F0F5F3",

    success: "#2F6F62",
    successHover: "#255A4F",
    successBg: "#E9EEEB",

    danger: "#A63D23",
    dangerHover: "#8C3219",
    dangerBg: "#FBF1EE",
    dangerBgHover: "#F6E6E1",

    warning: "#B7791F",
    warningText: "#8A5B00",
    warningBg: "#F7EEDC",

    info: "#3B5F86",
    infoBg: "#EAF0F6",

    // Não definido no Claude Design — derivado dos neutros.
    disabledBg: "#F1EEE9",
    disabledText: "#A39C93",
    disabledBorder: "#E8E3DB",
  },
  font: {
    family: "\"Figtree\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    size: {
      xs: 12,
      sm: 13,
      md: 14,
      base: 15,
      lg: 16,
      xl: 17,
      "2xl": 18,
      "3xl": 24,
      "4xl": 30,
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      normal: 1.5,
      relaxed: 1.6,
    },
    letterSpacing: {
      tight: "-0.01em",
      tighter: "-0.015em",
      tightest: "-0.02em",
    },
  },
  space: {
    2: 2,
    4: 4,
    6: 6,
    8: 8,
    10: 10,
    12: 12,
    14: 14,
    16: 16,
    20: 20,
    24: 24,
    28: 28,
    32: 32,
    48: 48,
  },
  radius: {
    "2xs": 4,
    xs: 6,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 14,
    "2xl": 16,
    "3xl": 20,
    full: 9999,
  },
  shadow: {
    xs: "0 1px 2px rgba(36, 31, 27, 0.05)",
    sm: "0 1px 2px rgba(36, 31, 27, 0.06)",
    md: "0 1px 2px rgba(36, 31, 27, 0.08)",
    hover: "0 2px 6px rgba(36, 31, 27, 0.10)",
    lg: "0 1px 3px rgba(36, 31, 27, 0.10), 0 12px 32px rgba(36, 31, 27, 0.06)",
    xl: "0 16px 40px rgba(36, 31, 27, 0.14)",
    raised: "0 1px 2px rgba(36, 31, 27, 0.05), 0 16px 40px rgba(36, 31, 27, 0.06)",
  },
  control: {
    xs: 34,
    sm: 28,
    md: 40,
    field: 44,
    lg: 48,
    labelHeight: 20,
    // rótulo acima do campo + espaço até o campo
    labelOffset: 26,
  },
  layout: {
    barHeight: 80,
    railWidth: 84,
    railFooter: 96,
  },
  transition: {
    fast: "0.15s ease",
  },
} as const;

const C = TOKENS.color;

export const antdTheme = {
  token: {
    colorPrimary: C.accent,
    colorPrimaryHover: C.accentHover,
    colorPrimaryActive: C.accentHover,
    colorPrimaryBg: C.accentSoft,
    colorPrimaryBgHover: C.accentSoftHover,
    colorLink: C.accent,
    colorLinkHover: C.accentHover,
    colorLinkActive: C.accentHover,

    colorSuccess: C.success,
    colorSuccessBg: C.successBg,

    colorError: C.danger,
    colorErrorHover: C.dangerHover,
    colorErrorActive: C.dangerHover,
    colorErrorBg: C.dangerBg,
    colorErrorBgHover: C.dangerBgHover,

    colorWarning: C.warning,
    colorWarningText: C.warningText,
    colorWarningBg: C.warningBg,

    colorInfo: C.info,
    colorInfoBg: C.infoBg,

    colorBgLayout: C.bg,
    colorBgContainer: C.surface,
    colorBgElevated: C.surface,
    colorBgMask: C.overlay,
    colorBgContainerDisabled: C.disabledBg,

    colorText: C.ink,
    colorTextSecondary: C.textSecondary,
    colorTextTertiary: C.textMuted,
    colorTextDisabled: C.disabledText,

    colorBorder: C.border,
    colorBorderSecondary: C.borderSubtle,

    controlItemBgHover: C.surfaceHover,

    fontFamily: TOKENS.font.family,
    fontSizeSM: TOKENS.font.size.xs,
    fontSize: TOKENS.font.size.md,
    fontSizeLG: TOKENS.font.size.lg,
    fontSizeXL: TOKENS.font.size["2xl"],
    fontSizeHeading1: TOKENS.font.size["4xl"],
    fontSizeHeading2: TOKENS.font.size["3xl"],
    fontSizeHeading3: TOKENS.font.size["2xl"],
    fontSizeHeading4: TOKENS.font.size.xl,
    fontSizeHeading5: TOKENS.font.size.lg,
    fontWeightStrong: TOKENS.font.weight.bold,
    lineHeight: TOKENS.font.lineHeight.normal,

    borderRadiusXS: TOKENS.radius.xs,
    borderRadiusSM: TOKENS.radius.sm,
    borderRadius: TOKENS.radius.lg,
    borderRadiusLG: TOKENS.radius["2xl"],

    boxShadow: TOKENS.shadow.xl,
    boxShadowSecondary: TOKENS.shadow.hover,
    boxShadowTertiary: TOKENS.shadow.xs,
  },
  components: {
    Tooltip: {
      colorBgSpotlight: C.surface,
      colorTextLightSolid: C.text,
    },
    Typography: {
      colorTextHeading: C.ink,
      colorText: C.textMuted,
      titleMarginTop: 0,
      titleMarginBottom: 0,
      fontWeightStrong: TOKENS.font.weight.semibold,
    },
    Table: {
      headerBg: C.surface,
      headerColor: C.textMuted,
      headerSplitColor: "transparent",
      borderColor: C.borderSubtle,
      rowHoverBg: C.surfaceHover,
      // linha de 54px no design: avatar de 32px + 11px acima e abaixo
      cellPaddingBlock: 11,
      cellPaddingInline: TOKENS.space[8],
      cellFontSize: TOKENS.font.size.md,
    },
    Button: {
      controlHeightLG: TOKENS.control.lg,
      controlHeight: TOKENS.control.md,
      controlHeightSM: TOKENS.control.sm,
      borderRadiusSM: TOKENS.radius.sm,
      fontWeight: TOKENS.font.weight.semibold,
      defaultShadow: "none",
      primaryShadow: "none",
      dangerShadow: "none",
    },
    Form: {
      itemMarginBottom: TOKENS.space[16],
    },
    // Campos no padrão C: preenchidos, sem borda, raio 12, altura 44.
    Input: {
      colorFillTertiary: C.fieldBg,
      colorFillSecondary: C.rail,
      activeBg: C.fieldBg,
      hoverBg: C.rail,
      activeBorderColor: C.accent,
      activeShadow: "none",
      borderRadiusLG: TOKENS.radius.lg,
      controlHeightLG: TOKENS.control.field,
      fontSizeLG: TOKENS.font.size.base,
      paddingInlineLG: TOKENS.space[14],
    },
    DatePicker: {
      colorFillTertiary: C.fieldBg,
      colorFillSecondary: C.rail,
      activeBg: C.fieldBg,
      hoverBg: C.rail,
      activeBorderColor: C.accent,
      activeShadow: "none",
      borderRadiusLG: TOKENS.radius.lg,
      controlHeightLG: TOKENS.control.field,
      fontSizeLG: TOKENS.font.size.base,
      paddingInlineLG: TOKENS.space[14],
      cellActiveWithRangeBg: C.accentSoft,
    },
    Select: {
      colorFillTertiary: C.fieldBg,
      colorFillSecondary: C.rail,
      activeBorderColor: C.accent,
      activeOutlineColor: "transparent",
      borderRadiusLG: TOKENS.radius.lg,
      controlHeightLG: TOKENS.control.field,
      fontSizeLG: TOKENS.font.size.base,
      optionHeight: TOKENS.control.md,
      optionFontSize: TOKENS.font.size.md,
      optionActiveBg: C.bg,
      optionSelectedBg: C.accentSoft,
      optionSelectedColor: C.accent,
      optionSelectedFontWeight: TOKENS.font.weight.semibold,
    },
    // Interruptor do design: trilho 44×24, alça 18.
    Switch: {
      trackHeight: 24,
      trackMinWidth: TOKENS.control.field,
      handleSize: 18,
    },
    Divider: {
      colorSplit: C.borderSubtle,
    },
    Modal: {
      borderRadiusLG: TOKENS.radius["3xl"],
      boxShadow: TOKENS.shadow.xl,
    },
    Popover: {
      borderRadiusLG: TOKENS.radius.lg,
      boxShadowSecondary: TOKENS.shadow.lg,
    },
    Skeleton: {
      gradientFromColor: C.rail,
      gradientToColor: C.border,
    },
  },
};
