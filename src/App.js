import React from 'react';
import { ThemeProvider, Grid } from "@material-ui/core";
import theme from './theme/theme';
import Header from './components/Header/Header'
import SearchBar from './components/Search/SearchBar';
import JobCard from './components/Job/JobCard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid container justifyContent='center'>
        <Grid item xs={10}>
          <SearchBar />
          <JobCard />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
