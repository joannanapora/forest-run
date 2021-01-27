import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignIn from './signin.component';
import SignUp from './signup.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            [theme.breakpoints.down("sm")]: {
                overflow: 'hidden'
            },
            [theme.breakpoints.up("md")]: {
                margin: '0 8vw',
                padding: theme.spacing(2),
                overflow: 'hidden'

            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(2),
                margin: '0 8vw',
                overflow: 'hidden'
            },
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(5),
            minHeight: '40vw',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        },
    }));

const SignInUp = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
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
        </div>
    );
};


export default SignInUp;