import styled, { CreateStyled } from 'react-emotion'

export interface Theme {
  colors: {
    background: string
    body: string
    primaryColor: string
    primaryLightColor: string
    primaryDarkColor: string
    primaryTextColor: string
    grayFont: string
    headings: string
    borders: string
    ratings: string
    footerBg: string
    tinted: string
    darkGray: string
    grayBg: string
    paleGray: string
    black: string
    white: string
    peach: string
    accent: string
  }
  fonts: {
    body: string
    headings: string
    bold: string
    accent: string
  }
  fontSizes: {
    h1: string
    h2: string
    h3: string
    h4: string
    small: string
    base: string
    big: string
    bigger: string
    biggest: string
    huge: string
    godzilla: string
    top_menu: string
    wallet_title: string
    counter: string
  }
  containerPadding: string
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  widths: {
    md: string
    lg: string
    xl: string
  }
  heights: {
    header: string
  }
}

export default styled as CreateStyled<Theme>
