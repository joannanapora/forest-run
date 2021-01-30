import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';
import { useSignInUpStyles } from './sign-in-up.styles';


const SignInUp = () => {
    const classes = useSignInUpStyles();

    return (
        <Grid className={classes.root} container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <SignIn />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <SignUp />
                </Paper>
            </Grid>
        </Grid>
    );
};


export default SignInUp;