import { theme } from "../../tailwind.config"

interface Colors {
  logoColor: string;
  baseColor: string;
  bgSecondary: string;
  bgComponent: string;
  primaryColor: string;
  textColor: string;
  alertColor: string;
  sucessColor: string;
}

const colors: Colors = theme.extend.colors

interface FontSize {
  sm: string;
  base: string;
  xl: string;
}

const fontSize: FontSize = theme.extend.fontSize;

interface FontFamily {
  title: string;
  alt: string;
  subtitle: string;
  body: string;
}

const fontFamily: FontFamily = theme.extend.fontFamily;

export {
  colors,
  fontSize,
  fontFamily,
}
