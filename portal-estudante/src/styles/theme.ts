import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#6C5F8D",
    primary_light: "#C5A4DB",
    primary_light_100: "#F3F0F9",
    primary_light_200: "#D9D9EC",
    primary_600: "#897BB0",
    secondary: "#F19E0F",
    background: "#FFFFFF",
    background_2: "#F3F3F3",
    background_3: "#F5F7FF",
    textWhite: "#FFFFFF",
    foreground: "#878787",
    muted: "#c4c4c4ff",
    textBlack: "#000000",
    sucess: "#0EBC29",
    error: "#EC4242",
    primary_dark: "#200E32"
  },
  fonts: {
    family: {
      poppins: "var(--font-poppins), sans-serif",
    },
    weight: {
      light: "300",
      regular: "400",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
  },
};