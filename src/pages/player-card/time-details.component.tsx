import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const TimeDetails = ({ timeZone, days, hours, }:
    { timeZone: string, days: string[], hours: string[], }) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            timeDetails: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%'
            }
        }
        ));

    const classes = useStyles();


    return (
        <div className={classes.timeDetails}>
            <Typography color='primary'>
                Availability:
 </Typography>
            <Typography color='secondary'>
                I play
            </Typography>
            <Typography>
                {days}
            </Typography>
            <Typography color='secondary'>
                in hours
            </Typography>
            <Typography>
                {hours}{timeZone}
            </Typography>
        </div>
    );
}


export default TimeDetails;