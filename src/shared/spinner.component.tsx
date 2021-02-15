import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: theme.spacing(4),
            alignItems: 'center',
            justifyContent: 'center'
        },
    }),
);

const CircularIndeterminate = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress color="primary" />
            <CircularProgress color="secondary" />
            <CircularProgress color="primary" />
        </div>
    );
}

export default CircularIndeterminate;
