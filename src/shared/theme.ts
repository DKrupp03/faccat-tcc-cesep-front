export const COLORS = {
  primary: {
    main: "#5E81F4",
    mainHover: "#3362FB",
    dark: "#1C1D21",
    grey: "#8181A5",
    greyHover: "#656583",
    outline: "#F0F0F3",
    outlineHover: "#EAEAEA",
  },
  background: {
    light: "#F5F5FA",
    default: "#F6F6F6",
    white: "#FFFFFF",
  },
  secondary: {
    yellow: "#F4BE5E",
    green: "#7CE7AC",
    greenHover: "#5BCC8E",
    red: "#FF808B",
    redHover: "#FB5D6A",
    purple: "#9698D6",
    cyan: "#40E1FA",
    cyanHover: "#15C0DA",
  },
  white: "#FFFFFF",
  black: "#000000",
};

export const antdTheme = {
  token: {
    colorPrimary: COLORS.primary.main,
    colorSuccess: COLORS.secondary.green,
    colorError: COLORS.secondary.red,
    colorWarning: COLORS.secondary.yellow,
    colorBgLayout: COLORS.background.light,
    colorBgContainer: COLORS.background.white,
    colorText: COLORS.primary.dark,
    colorTextSecondary: COLORS.primary.grey,
    colorBorder: COLORS.primary.outline,
    borderRadius: 8,
    boxShadowSecondary: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    fontFamily: "\"Lato\", sans-serif",
    fontWeightStrong: 700,
  },
  components: {
    Tooltip: {
      colorBgSpotlight: COLORS.background.white,
      colorTextLightSolid: COLORS.primary.grey,
    },
    Typography: {
      colorTextHeading: COLORS.primary.dark,
      colorText: COLORS.primary.grey,
      titleMarginTop: 0,
      titleMarginBottom: 0,
      fontWeightStrong: 600,
    },
    Table: {
      headerBg: COLORS.white,
      headerColor: COLORS.primary.grey,
      cellPaddingBlock: 8,
      cellPaddingInline: 24,
    },
    Modal: {
      contentPadding: 0,
    },
    Select: {
      colorBorder: COLORS.primary.outline,
      colorPrimary: COLORS.primary.grey,
      colorPrimaryHover: COLORS.primary.grey,
      controlOutlineWidth: 0,
      fontSize: 14,
    },
  },
};
