export const colors = {
  primary: {
    50: "#E9F6FD",
    100: "#CCFAFA",
    200: "#5BC0DE",
    500: "#27A1EF",
    900: "#012E4C",
  },
  gray: {
    50: "#F6F6F6",
    100: "#F2F5F6",
    200: "#DFDFE0",
    300: "#4D6D82",
    400: "#68686E",
    500: "#4B4B53",
    600: "#313135",
    700: "#19191C",
    800: "#0D0D0E",
    900: "#040404",
  },
  green: {
    50: "#F0FDF4",
    100: "#CCFADF",
    500: "#23D44A",
    900: "#14532D",
  },
  red: {
    50: "#FEF2F2",
    100: "#FACFCC",
    500: "#EF4444",
    900: "#7F1D1D",
  },
  amber: {
    50: "#FFFBEB",
    75: "#FFF4CE",
    100: "#FFECD1",
    300: "#FCD34D",
    500: "#F59E0B",
    900: "#92400E",
  },
  white: "#FFFFFF",
  black: "#000000",
};

export const antdTheme = {
  token: {
    colorPrimary: colors.primary[500],
    colorSuccess: colors.green[500],
    colorError: colors.red[500],
    colorWarning: colors.amber[500],
    colorBgLayout: colors.gray[50],
    colorBgContainer: colors.white,
    colorText: colors.gray[700],
    colorTextSecondary: colors.gray[300],
    colorBorder: colors.gray[100],
    borderRadius: 8,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};
