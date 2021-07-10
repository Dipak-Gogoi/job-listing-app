import React, { useState } from 'react';
import {
    Box,
    Grid,
    FilledInput,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    makeStyles,
    Button,
    IconButton
} from "@material-ui/core";
import { Close } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        transition: '.3s',
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#fff',
        }
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    }
}));

const NewJobModal = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        type: 'Full time',
        companyName: '',
        companyUrl: '',
        location: 'Remote',
        link: '',
        description: '',
        skills: [],
    });

    const handleChange = (e) => {
        e.persist();
        setJobDetails((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const addRemoveSkills = skill => jobDetails.skills.includes(skill)
        ? setJobDetails((oldState) => ({
            ...oldState,
            skills: oldState.skills.filter((removeSkill) => removeSkill !== skill),
        })) //remove skills
        : setJobDetails((oldState) => ({
            ...oldState,
            skills: oldState.skills.concat(skill),
        })); //add skills

    const classes = useStyles();
    const skills = [
        'Javascript',
        'React',
        'Node',
        'Vue',
        'Firebase',
        'MongoDB',
        'SQL',
    ];
    console.log(jobDetails);
    return (
        <Dialog open={true} fullWidth>
            <DialogTitle>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    Post Job
                    <IconButton>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange={handleChange}
                            name='title'
                            value={jobDetails.title}
                            autoComplete='off'
                            placeholder='Job title *'
                            disableUnderline
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            onChange={handleChange}
                            name='type'
                            value={jobDetails.type}
                            fullWidth
                            disableUnderline
                            variant='filled'
                        >
                            <MenuItem value='Full time'>Full time</MenuItem>
                            <MenuItem value='Part time'>Part time</MenuItem>
                            <MenuItem value='Contract'>Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange={handleChange}
                            name='companyName'
                            value={jobDetails.companyName}
                            autoComplete='off'
                            placeholder='Comapny Name *'
                            disableUnderline
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange={handleChange}
                            name='companyUrl'
                            value={jobDetails.companyUrl}
                            autoComplete='off'
                            placeholder='Comapny URL*'
                            disableUnderline
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            onChange={handleChange}
                            name='location'
                            value={jobDetails.location}
                            fullWidth
                            disableUnderline
                            variant='filled'
                        >
                            <MenuItem value='Remote'>Remote</MenuItem>
                            <MenuItem value='In-Office'>In-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange={handleChange}
                            name='link'
                            value={jobDetails.link}
                            autoComplete='off'
                            placeholder='Job Link*'
                            disableUnderline
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput
                            onChange={handleChange}
                            name='description'
                            value={jobDetails.description}
                            autoComplete='off'
                            placeholder='Job Description*'
                            disableUnderline
                            fullWidth
                            multiline rows={4}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display='flex'>
                        {
                            skills.map((skill) => (
                                <Box
                                    onClick={() => addRemoveSkills(skill)}
                                    className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`}
                                    key={skill}>{skill}
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color='red' width='100%' display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='caption'>*Required fields</Typography>
                    <Button variant='contained' color='primary'>Post job</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default NewJobModal
