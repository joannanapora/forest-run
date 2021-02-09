import React from 'react';

import { useSignInUpStyles } from './sign-in-up.styles';
import SignUp from '../sign-up/sign-up.container';
import SignIn from '../sign-in/sign-in.container';

import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const SignInUp = () => {
    const classes = useSignInUpStyles();

    return (
        <Grid className={classes.root} container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>LOGIN</Typography>
                    <SignIn />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>REGISTER</Typography>
                    <SignUp />
                </Paper>
            </Grid>
        </Grid>
    );
};


export default SignInUp;