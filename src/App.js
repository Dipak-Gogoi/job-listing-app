import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Grid, CircularProgress, Button } from "@material-ui/core";
import theme from './theme/theme';
import Header from './components/Header/Header'
import SearchBar from './components/Search/SearchBar';
import JobCard from './components/Job/JobCard';
import NewJobModal from './components/Job/NewJobModal';
import { firestore, app } from './firebase/config';
import { Close } from '@material-ui/icons';
import ViewJobModal from './components/Job/ViewJobModal'

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
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

  const searchJobs = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .where('location', '==', jobSearch.location)
      .where('type', '==', jobSearch.type)
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

  const postJob = async (jobDetails) => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openNewJobModal = () => {
    setNewJobModal(true);
  };

  const closeNewJobModal = () => {
    setNewJobModal(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={openNewJobModal} />
      <NewJobModal
        closeNewJobModal={closeNewJobModal}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJobModal
        job={viewJob}
        closeModal={() => setViewJob({})}
      />
      <Box mb={3}>
        <Grid container justifyContent='center'>
          <Grid item xs={10}>
            <SearchBar searchJobs={searchJobs} />
            {
              loading ? (
                <Box display='flex' justifyContent='center'>
                  <CircularProgress />
                </Box>
              ) : (
                  <>
                    {customSearch && (
                      <Box my={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={fetchJobs}>
                          <Close seize={20} />
                          Custom Search
                  </Button>
                      </Box>
                    )}
                    {jobs.map((job) => (
                      <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                    ))}
                  </>
                )
            }
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
