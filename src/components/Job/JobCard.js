import React from 'react';
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { differenceInHours } from 'date-fns';


const useStyle = makeStyles((theme) => ({
    wrapper: {
        border: '1px solid #e8e8e8',
        cursor: 'pointer',
        transition: '.3s',

        '&:hover': {
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)',
            borderLeft: '1.5px solid #4D64E4',
        }
    },
    companyName: {
        fontSize: '13.5px',
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: '5px',
        display: 'inline-block',
        fontWeight: 600,
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        transition: '.3s',
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    }
}));

const JobCard = (props) => {
    const classes = useStyle();
    return (
        <Box p={2} className={classes.wrapper}>
            <Grid container alignItems='center'>
                <Grid item xs>
                    <Typography variant='subtitle1'>{props.title}</Typography>
                    <Typography className={classes.companyName} variant='subtitle1'>{props.companyName}</Typography>
                </Grid>
                <Grid item container xs>
                    {
                        props.skills.map((skill) => (
                            <Grid className={classes.skillChip} key={skill} item>{skill}</Grid>
                        ))
                    }
                </Grid>
                <Grid item container direction='column' alignItems='flex-end' xs>
                    <Grid item>
                        <Typography variant='caption'>{differenceInHours(Date.now(), props.postedOn)} min ago | {props.type} | {props.location}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button onClick={props.open} variant='outlined'>View</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default JobCard
