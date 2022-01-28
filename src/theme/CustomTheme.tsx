import { createTheme } from '@mui/material';
import { lightBlue, indigo, grey } from '@mui/material/colors';

export const customTheme = createTheme({
  palette: {
    background: {
      default: 'rgb(255,255,255)',
    },
    primary: indigo,
    secondary: lightBlue,
    grey: grey,
  },
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
