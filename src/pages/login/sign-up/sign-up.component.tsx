import React, { useState, useEffect } from 'react';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import { validateEmail } from '../../../shared/email-validation';
import { validatePassword } from '../../../shared/password-validation';
import Alert from '@material-ui/lab/Alert';
import { useSignUpStyles } from './sign-up.styles';

interface State {
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    username: string;
}


const SignUp = ({ history }: any) => {
    const classes = useSignUpStyles();
    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        username: '',
    });

    const [wrongEmail, showWrongEmail]: [boolean, any] = useState(false);
    const [wrongPassword, showWrongPassword]: [boolean, any] = useState(false);
    const [dontMatch, showDontMatch]: [boolean, any] = useState(false);


    useEffect(() => {
    }, [wrongEmail, wrongPassword, dontMatch])


    const handleSubmit = async event => {
        event.preventDefault();

        if (!validateEmail(values.email)) {
            showWrongEmail(true);
            offAlert();
            return;
        }
        if (!validatePassword(values.password)) {
            showWrongPassword(true);
            offAlert();
            return;
        }

        if (values.password !== values.confirmPassword) {
            showDontMatch(true);
            offAlert();
        }

        submitSignUp();


        /// connect to GRAPH QL

    }

    const offAlert = () => {
        setTimeout(() => {
            showWrongEmail(false);
            showWrongPassword(false);
            showDontMatch(false);
        }, 5000);
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
            <TextField onChange={handleChange('username')}
                className={classes.textfield} name='playerUsername' label="Username" variant="filled" />
            <FormControl className={classes.textfield} variant="filled">
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
                wrongEmail ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Wrong email</Alert></div>
                ) : null
            } {
                wrongPassword ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Wrong password</Alert></div>
                ) : null
            } {
                dontMatch ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Passwords don't match</Alert></div>
                ) : null
            }
            <Button className={classes.loginButton} onClick={handleSubmit} variant="contained" color="primary">
                Register
</Button>
        </div>
    );
};


export default withRouter(SignUp);