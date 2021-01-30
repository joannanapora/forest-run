import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSpinnerStyles } from './spinner.styles';



export default function CircularIndeterminate() {
    const classes = useSpinnerStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}