import React from 'react';
import { Box, Grid, Typography, Button } from "@material-ui/core";

const Header = (props) => {
    return (
        <Box py={10} bgcolor='secondary.main' color='white'>
            <Grid container justifyContent='center'>
                <Grid item xs={10}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h4">Open job Listing</Typography>
                        <Button
                            onClick={props.openNewJobModal}
                            variant='contained'
                            color='primary'
                            disableElevation
                        >
                            Post a Job
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header
