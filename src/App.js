import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Grid, CircularProgress } from "@material-ui/core";
import theme from './theme/theme';
import Header from './components/Header/Header'
import SearchBar from './components/Search/SearchBar';
import JobCard from './components/Job/JobCard';
import NewJobModal from './components/Job/NewJobModal';
import { firestore } from './firebase/config';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true );

  const fetchJobs = async () => {
    const req = await firestore
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .get();
    // console.log(req);
    const tempJobs = req.docs.map((job) => ({ 
      ...job.data(), 
      id: job.id,
      postedOn: job.data().postedOn.toDate(), 
    }));
    // console.log(tempJobs);
    setJobs(tempJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Grid container justifyContent='center'>
        <Grid item xs={10}>
          <SearchBar />
          <NewJobModal />
          {
            loading ? (
              <Box display='flex' justifyContent='center'>
               <CircularProgress />
              </Box>
             ) : (
               jobs.map((job) => (
                <JobCard key={job.id} {...job} />)
              ))
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
