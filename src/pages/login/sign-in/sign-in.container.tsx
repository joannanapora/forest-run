import React, { Dispatch, SetStateAction, useState } from 'react';

import { useSignInStyles } from './sign-in.styles';
import SpinnerButton from '../../../shared/spinner-button.component';

import { setCurrentUser } from '../../../store-redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FilledInput, FormControl, InputLabel, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { LOGIN_USER } from '../../../grapQL';
import { useMutation } from '@apollo/react-hooks';


interface DetailsForm {
    email: string;
    password: string;
}

interface ErrorAlerts {
    wrongEmailPassword: boolean;
    internalBackendError: boolean;
}

const SignIn = ({ dispatchSetCurrentUser, history }) => {
    const classes = useSignInStyles();
    const [values, setValues]: [DetailsForm, Dispatch<SetStateAction<DetailsForm>>] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors]: [ErrorAlerts, Dispatch<SetStateAction<ErrorAlerts>>] = useState({
        wrongEmailPassword: false,
        internalBackendError: false,
    });

    const [loginUser, { loading }] = useMutation(
        LOGIN_USER, {
        update(_, result) {
            history.push('/upcoming-events');
            const Token = result.data.login.accessToken;
            localStorage.setItem('token', Token);
            dispatchSetCurrentUser({
                username: result.data.login.username
            });
        },
        onError(e) {
            if ((e.graphQLErrors[0].message as any).statusCode === 500) {
                setErrors({ ...errors, internalBackendError: true });
            }
            if ((e.graphQLErrors[0].message as any).statusCode === 401) {
                setErrors({ ...errors, wrongEmailPassword: true });
            }
        },
        variables: {
            email: values.email,
            password: values.password
        }
    }
    );

    const handleChange = (prop: keyof DetailsForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            wrongEmailPassword: false,
            internalBackendError: false,
        });
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        loginUser();
    };

    const submitOnEnter = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter") {
            loginUser();
        }
    };

    if (loading) {
        return (
            <div className={classes.form}>
                <TextField value={values.email}
                    disabled
                    onKeyDown={submitOnEnter}
                    onChange={handleChange('email')}
                    className={classes.textfield}
                    name='email'
                    label="email"
                    variant="filled" />
                <FormControl className={classes.textfield} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        disabled
                        onKeyDown={submitOnEnter}
                        id="filled-adornment-password"
                        type={'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                </FormControl>
                <SpinnerButton className={classes.loginButton} loading={loading} buttonLabel={'Submit'} onClick={handleSubmit} />
            </div>
        )
    }
    if (!loading)
        return (<div className={classes.form}>
            <TextField value={values.email}
                onKeyDown={submitOnEnter}
                onChange={handleChange('email')}
                className={classes.textfield}
                name='Email'
                label="Email"
                variant="filled" />
            <FormControl className={classes.textfield} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    onKeyDown={submitOnEnter}
                    id="filled-adornment-password"
                    type={'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                />
            </FormControl>
            {
                errors.internalBackendError ? (
                    <Alert severity="error">Something went wrong Try again later</Alert>
                ) : null
            }
            {
                errors.wrongEmailPassword ? (
                    <Alert severity="error">Email or Password is wrong</Alert>
                ) : null
            }
            <SpinnerButton className={classes.loginButton} loading={loading} buttonLabel={'Submit'} onClick={handleSubmit} />

        </div>);

    return (
        <></>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});


export default withRouter(connect(
    null,
    mapDispatchToProps)
    (SignIn));