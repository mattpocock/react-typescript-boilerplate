import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const ThemeProvider = ({ children }: { children: any }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export const theme = createMuiTheme({});

export default ThemeProvider;
