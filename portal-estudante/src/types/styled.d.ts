import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primary_light: string
      primary_light_200: string
      primary_light_100: string
      primary_600: string
      secondary: string
      background: string
      background_2: string
      background_3: string
      textWhite: string
      foreground: string
      muted: string
      textBlack: string
      sucess: string
      error: string
      primary_dark: string
    }
    fonts: {
      family: {
        poppins: string
      }
      weight: {
        light: string
        regular: string
        semibold: string
        bold: string
        extrabold: string
        black: string
      }
    }
  }
}