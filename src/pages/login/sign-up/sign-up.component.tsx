import React, { useState } from 'react';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import { validateEmail } from '../../../shared/email-validation';
import { validatePassword } from '../../../shared/password-validation';
import Alert from '@material-ui/lab/Alert';
import { useSignUpStyles } from './sign-up.styles';

interface DetailsForm {
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    username: string;
}

interface ErrorAlerts {
    wrongEmail: boolean;
    wrongPassword: boolean;
    passwordsDontMatch: boolean;
    usernameTooShort: boolean;
    usernameTooLong: boolean;
}


const SignUp = ({ history }: any) => {
    const classes = useSignUpStyles();
    const [values, setValues] = React.useState<DetailsForm>({
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        username: '',
    });

    const [notifications, setNotification] = React.useState<ErrorAlerts>({
        wrongEmail: false,
        wrongPassword: false,
        passwordsDontMatch: false,
        usernameTooShort: false,
        usernameTooLong: false,
    });



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateEmail(values.email)) {
            setNotification({ ...notifications, wrongEmail: true });
            offAlert();
            return;
        }
        if (values.username.length < 3) {
            setNotification({ ...notifications, usernameTooShort: true });
            offAlert();
            return;
        }
        if (values.username.length > 18) {
            setNotification({ ...notifications, usernameTooLong: true });
            offAlert();
            return;
        }

        if (!validatePassword(values.password)) {
            setNotification({ ...notifications, wrongPassword: true });
            offAlert();
            return;
        }

        if (values.password !== values.confirmPassword) {
            setNotification({ ...notifications, passwordsDontMatch: true });
            offAlert();
            return
        } else {
            submitSignUp();
        }



        /// connect to GRAPH QL

    }

    const offAlert = () => {
        setTimeout(() => {
            setNotification({ ...notifications, wrongEmail: false });
            setNotification({ ...notifications, usernameTooShort: false });
            setNotification({ ...notifications, usernameTooLong: false });
            setNotification({ ...notifications, wrongPassword: false });
            setNotification({ ...notifications, passwordsDontMatch: false });
        }, 5000);
    }

    const handleChange = (prop: keyof DetailsForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const submitSignUp = () => {
        if (history) {
            if (history) { history.push('/upcoming-events') };
        }
    }

    return (
        <div className={classes.form}>
            <TextField onChange={handleChange('email')}
                className={classes.textfield} name='playerUsername' label="Email" variant="filled" />
            {
                notifications.wrongEmail ? (
                   <Alert severity="error">Wrong email</Alert>
                ) : null
            }
            <TextField onChange={handleChange('username')}
                className={classes.textfield} name='playerUsername' label="Username" variant="filled" />
            <FormControl className={classes.textfield} variant="filled">
                {
                    notifications.usernameTooShort ? (
              <Alert severity="error">Username's too short (3-18 char.)</Alert>
                    ) : null
                }{
                    notifications.usernameTooLong ? (
                        <Alert severity="error">Username's too long (3-18 char.)</Alert>
                    ) : null
                }
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    error={false}
                    id="filled-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {
                    notifications.wrongPassword ? (
                        <Alert severity="error">Wrong password</Alert>
                    ) : null
                }
            </FormControl>
            <FormControl className={classes.textfield} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                <FilledInput
                    error={false}
                    id="filled-adornment-password"
                    type={'password'}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    endAdornment={
                        <InputAdornment position="end" />
                    }
                />
            </FormControl>
            {
                notifications.passwordsDontMatch ? (
                    <Alert severity="error">Passwords don't match</Alert>
                ) : null
            }
            <Button className={classes.loginButton} onClick={handleSubmit} variant="contained" color="primary">
                Register
</Button>
        </div>
    );
};


export default withRouter(SignUp);