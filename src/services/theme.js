import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#585ea4',
      main: '#273575',
      dark: '#001049'
    },
    text: {
      light: '#9a9a9a',
      main: '#fff',
      dark: '#172637'
    },
    secondary: {
      light: '#f6f8fc',
      main: '#f5f5f5',
      dark: '#e9eaf1',
      danger: '#ff272e',
      success: '#009a1e'
    },
    scroll: {
      light: '#e6e6e6',
      main: '#fff',
      dark: '#ccc'
    }
  },
  typography: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: 'inherit'
    },
    h2: {
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '1.2'
    },
    h3: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: 'inherit'
    },
    h4: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 'inherit'
    },
    h5: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '1.5'
    },
    h6: {
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: 'inherit'
    },
    title: {
      fontWeight: 800,
      fontSize: '48px',
      lineHeight: 1.5
    },
    subtitle:{
      fontWeight: 200,
      fontSize: '30px',
      lineHeight: 1.2

    },
    button: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.75,
      textTransform: 'inherit',
      padding: '10px 0px',
      border: 'none',
      borderRadius: '5px'
    }
  },
  spacing: factor =>
    [
      0,
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
      100
    ][factor]
});

/* 
h6 10 1
h5 12 1 1 1 1 1 1 1
h4 14 1 1 1 1 1 1 1 1 1 1 1 1 
h3 18 1 1 1 1 1
h2 24 1 1
h1 : 28 1

40 1
60 1
200 1

subtitile1 34
subtitile1 : 22px 1 1 1 -> mobile font size
subtitile2 20
fontsize 16
*/
