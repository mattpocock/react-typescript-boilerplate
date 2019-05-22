import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const ThemeProvider = ({ children }: Props) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

interface Props {
  children: any;
}

export const theme = createMuiTheme({});

export default ThemeProvider;
