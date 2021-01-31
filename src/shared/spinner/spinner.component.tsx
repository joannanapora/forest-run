import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSpinnerStyles } from './spinner.styles';


const Spinner = () => {

    const classes = useSpinnerStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default Spinner;