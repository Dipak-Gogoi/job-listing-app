import React from 'react';
import { ThemeProvider } from "@material-ui/core";
import theme from './theme/theme';
import Header from './components/Header/Header'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
