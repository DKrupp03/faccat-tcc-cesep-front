export const COLORS = {
  black: "#000000",
  navy: "#092C4C",
  blue: "#514EF3",
  gren: "#2DC8A8",
  red: "#EF4444",
  yellow: "#FFC357",
  pink: "#FE8084",
  grey90: "#526477",
  grey70: "#7E92A2",
  grey50: "#D6E1E6",
  grey30: "#EAEEF4",
  grey10: "#F6FAFD",
  white: "#FFFFFF",
};

export const antdTheme = {
  token: {
    colorPrimary: COLORS.blue,
    colorSuccess: COLORS.gren,
    colorError: COLORS.pink,
    colorWarning: COLORS.yellow,
    colorBgLayout: COLORS.grey10,
    colorBgContainer: COLORS.white,
    colorText: COLORS.navy,
    colorTextSecondary: COLORS.grey90,
    colorBorder: COLORS.grey50,
    borderRadius: 8,
    boxShadowSecondary: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    fontFamily: "\"Lato\", sans-serif",
    fontWeightStrong: 700,
  },
  components: {
    Tooltip: {
      colorBgSpotlight: COLORS.white,
      colorTextLightSolid: COLORS.grey90,
    },
    Typography: {
      colorTextHeading: COLORS.navy,
      colorText: COLORS.grey70,
      titleMarginTop: 0,
      titleMarginBottom: 0,
      fontWeightStrong: 600,
    },
    Table: {
      headerBg: COLORS.white,
      headerColor: COLORS.grey90,
      cellPaddingBlock: 8,
      cellPaddingInline: 24,
    },
    Modal: {
      contentPadding: 0,
    },
    Button: {
      controlHeightLG: 50,
      controlHeight: 40,
      controlHeightSM: 32,
    },
    Select: {
      colorBorder: COLORS.grey30,
      colorPrimary: COLORS.grey70,
      colorPrimaryHover: COLORS.grey70,
      controlOutlineWidth: 0,
      fontSize: 14,
    },
  },
};
