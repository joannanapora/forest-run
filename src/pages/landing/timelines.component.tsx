import React from 'react';

import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import { TimeLine } from './timelines.styles';

import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CreateIcon from '@material-ui/icons/Create';


const TimeLines = () => {
    return (
        <TimeLine align="alternate">
            <TimelineItem>
                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary" >
                        <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="h1">
                        Sign in
            </Typography>
                    <Typography>...it's easy like rushing B. </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="secondary" >
                        <CreateIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="h1">
                        Fill in
            </Typography>
                    <Typography>...the player's profile.</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary" >
                        <GroupAddIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="h1">
                        Join
            </Typography>
                    <Typography>...or create your dream team.</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <HeadsetMicIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6" component="h1">
                        Happy Gaming
            </Typography>
                    <Typography></Typography>
                </TimelineContent>
            </TimelineItem>
        </TimeLine>
    )
};



export default TimeLines;