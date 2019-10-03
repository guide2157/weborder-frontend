import { Theme } from '../../utils/styled'
import brandColors from './colors'
// @ts-ignore
import { lighten } from 'polished'

const lightTheme: Theme = {
    colors: {
        background: brandColors.background,
        body: brandColors.gray10,
        primaryColor: brandColors.primaryColor,
        primaryLightColor: brandColors.primaryLightColor,
        primaryDarkColor: brandColors.primaryDarkColor,
        primaryTextColor: brandColors.primaryTextColor,
        grayFont: brandColors.gray,
        headings: brandColors.gray5,
        black: brandColors.black,
        white: brandColors.white,
        borders: lighten(0.05, brandColors.gray75),
        ratings: brandColors.orange,
        footerBg: brandColors.gray5,
        tinted: brandColors.tint,
        darkGray: brandColors.gray100,
        grayBg: brandColors.gray1,
        paleGray: brandColors.roxiePaleGray,
        peach: brandColors.roxiePeach,
        accent: brandColors.roxieAccent,
    },
    fonts: {
        headings:
            "cera_promedium,Gilroy-SemiBold, Montserrat, 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif",
        body:
            "cera_proregular,Gilroy-Regular,'Source Sans Pro', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif",
        bold:
            "cera_probold,Gilroy-Bold,'Roboto', cursive, 'IBM Plex Mono', Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
        accent:
            "cera_problack,Gilroy-Heavy,'Roboto', cursive, 'IBM Plex Mono', Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    },
    fontSizes: {
        small: '0.8571rem',
        base: '1rem',
        big: '1.1428rem',
        bigger: '1.5rem',
        biggest: '2.2857rem',
        huge: '2.5714rem',
        godzilla: '3rem',
        top_menu: '1.2142rem',
        wallet_title: '1.2857rem',
        h1: '1.2857rem',
        h2: '1.1428rem',
        h3: '1rem',
        h4: '0.8571rem',
        counter: '0.7857rem'
    },
    containerPadding: '1.5rem',
    breakpoints: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
    },
    widths: {
        md: '720px',
        lg: '960px',
        xl: '1140px'
    },
    heights: {
        header: '60px'
    }
}

export default lightTheme