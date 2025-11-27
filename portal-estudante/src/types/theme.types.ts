export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  textWhite: string;
  foreground: string,
  textBlack: string,
}

export interface ThemeFonts {
    family: {
      poppins: string;
    };
    weight: {
      light: string;
      regular: string;
      semibold: string; 
      bold: string;
      extrabold: string;
      black: string;
    };
  };


export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
}
