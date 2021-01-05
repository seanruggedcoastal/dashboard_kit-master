const constants = {
  black: '#454f5b',
  white: '#fcfcfc',
  limeGreen: '#96FA00',
  green: '#38B249',
  blue: '#2F52E0',
  orange: '#EC4E20',
  yellow: '#FACF55',
  red: '#E6492D',
  lightGray: '#EBEDF0',
  sidebarSize: '200px'
};

const breakpoints = {
  xs: 0,
  sm: 675,
  md: 768,
  lg: 992,
  xl: 1200
};

const dark = {
  ...constants,
  breakpoints: {...breakpoints},
  normalText: constants.white,
  border: '#333333',
  background: '#1b1b1b',
  foreground: '#262626',
  mainColor: '#e3e3e3',
  altColor: constants.limeGreen
};

const light = {
  ...constants,
  breakpoints: {...breakpoints},
  normalText: constants.black,
  border: '#ebedf0',
  background: '#f4f6f8',
  foreground: constants.white,
  mainColor: constants.black,
  altColor: constants.blue
};

const theme = isDark => (isDark ? dark : light);

export default theme;