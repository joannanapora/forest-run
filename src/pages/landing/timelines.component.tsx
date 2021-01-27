import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTimeLinesStyles } from './timelines.styles';
import AppleIcon from '@material-ui/icons/Apple';
import { DirectionsRun, Search } from '@material-ui/icons';

const TimeLines = () => {
    const classes = useTimeLinesStyles();

    return (
        <Timeline align="alternate">
            <TimelineItem>
                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color='primary' variant="outlined">
                        <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Register
            </Typography>
                        <Typography>in Forest App</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <Search />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Find
            </Typography>
                        <Typography>your running group</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                        <DirectionsRun />
                    </TimelineDot>
                    <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Run
            </Typography>
                        <Typography>Forest, Run</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <AppleIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Eat
            </Typography>
                        <Typography>healthy and feel good</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
};

export default TimeLines;
