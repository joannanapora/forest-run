import React, { useState} from 'react';

import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

import { useSignInStyles } from './sign-in.styles';
import { LOGIN_USER } from '../../../grapQL';
import {useMutation} from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { setCurrentUser } from '../../../store-redux/user';

interface DetailsForm {
    email: string;
    password: string;
    showPassword: boolean;
}

interface ErrorAlerts {
    wrongEmailPassword: boolean;
    internalBackendError: boolean;
}

const SignIn = ({dispatchSetCurrentUser, history}) => {
    const classes = useSignInStyles();
    const [values, setValues] = useState<DetailsForm>({
        email: '',
        password: '',
        showPassword: false,
    });

      const [errors, setErrors] = useState<ErrorAlerts>({
        wrongEmailPassword: false,
        internalBackendError: false,
    });

    
    const [loginUser, {loading}] = useMutation(
        LOGIN_USER, {
            update(_, result){
                history.push('/upcoming-events');
                const Token = result.data.login.accessToken;
                localStorage.setItem('token', Token);
                dispatchSetCurrentUser({
                    username: result.data.login.username
                });
            },
            onError(e) {
                if ((e.graphQLErrors[0].message as any).statusCode === 500) {
                    setErrors({...errors, internalBackendError: true});
                }
                if ((e.graphQLErrors[0].message as any).statusCode === 401) {
                    setErrors({...errors, wrongEmailPassword: true});
                }
                        },
            variables: {
                email: values.email,
                password: values.password
            }
        }
    )


    const handleChange = (prop: keyof DetailsForm ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            wrongEmailPassword: false,
            internalBackendError: false,
        });
    };

    const handleClickShowPassword = (prop: keyof DetailsForm) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
    
        loginUser();
    };


    return (
        <div className={classes.form}>
            <TextField value={values.email} onChange={handleChange('email')} className={classes.textfield} name='email' label="email" variant="filled" />
            <FormControl className={classes.textfield} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
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
            <Button onClick={handleSubmit} className={classes.loginButton} variant="contained" color="primary">
                Submit
</Button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});


export default withRouter(connect(
    null,
    mapDispatchToProps)
    (SignIn));