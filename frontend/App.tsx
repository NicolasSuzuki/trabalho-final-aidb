import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './Main';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    secondary: '#80C197',
  },
};
export default () => {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
};
