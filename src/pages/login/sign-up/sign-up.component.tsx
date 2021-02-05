import React, { Dispatch, SetStateAction, useState } from 'react';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import { validateEmail } from '../../../shared/email-validation';
import { validatePassword } from '../../../shared/password-validation';
import Alert from '@material-ui/lab/Alert';
import { useSignUpStyles } from './sign-up.styles';
import {REGISTER_USER} from '../../../grapQL';
import {useMutation} from '@apollo/react-hooks';
import SpinnerButton from '../../../shared/spinner/spinner-button.component';
import { waitForDomChange } from '@testing-library/react';


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
    usernameExists: boolean;
    emailExists: boolean;
    usernameTooShort: boolean;
    usernameTooLong: boolean;
    userRegistered: boolean;
}


const SignUp = () => {
    const classes = useSignUpStyles();
    const [values, setValues]:[DetailsForm, Dispatch<SetStateAction<DetailsForm>>] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        username: '',
    });

    const [notifications, setNotification]:[ErrorAlerts, Dispatch<SetStateAction<ErrorAlerts>>] = useState({
        wrongEmail: false,
        wrongPassword: false,
        passwordsDontMatch: false,
        usernameTooLong:false,
        usernameTooShort:false,
        usernameExists: false,
        emailExists: false,
        userRegistered: false,
    });


    const [addUser, {loading}] = useMutation(
        REGISTER_USER, {
            update(_, result){
                setNotification({...notifications, userRegistered: true});
                clearAllInputs();
            },
            onError(e) {
                if ((e.graphQLErrors[0].message as any).statusCode === 409) {
                    setNotification({...notifications, usernameExists: true});
                }
                        },
            variables: {
                username: values.username,
                email: values.email,
                password: values.password
            }
        }
    );

    const clearAllInputs = (): void => {
        setValues({
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            username: '',
        })
    }

    const validateAndLogin = ():void => {
        
        let newNotification = {
            ...notifications
        }

        if (!validateEmail(values.email)) {
            newNotification = { ...newNotification,  wrongEmail: true};
        }
        if (values.username.length < 3) {
            newNotification = { ...newNotification,  usernameTooShort: true };
            // return;
        }
        if (values.username.length > 18) {
            newNotification = { ...newNotification,  usernameTooLong: true };
        }

        if (!validatePassword(values.password)) {
            newNotification = { ...newNotification,  wrongPassword: true };
        }

        if (values.password !== values.confirmPassword) {
            newNotification = { ...newNotification,  passwordsDontMatch: true };            // return
        }

        setNotification(newNotification);

    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>)=> {
        event.preventDefault();

        validateAndLogin();
            
        addUser();

    }




    const handleChange = (prop: keyof DetailsForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        setNotification({
        wrongEmail: false,
        wrongPassword: false,
        passwordsDontMatch: false,
        usernameTooLong:false,
        usernameTooShort:false,
        usernameExists: false,
        emailExists: false,
        userRegistered: false})
    };

    const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const submitOnEnter = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter") {

            event.preventDefault();

            validateAndLogin();
                
            addUser();
        }
    };

    if (loading) {
        return (
        <div className={classes.form}>
            <TextField disabled onChange={handleChange('email')}
                className={classes.textfield} name='email' label="Email"   value={values.email} variant="filled" />
            <TextField disabled onChange={handleChange('username')}
            value={values.username}
                className={classes.textfield} name='username' label="Username" variant="filled" />
            <FormControl className={classes.textfield} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                disabled
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
                disabled
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
             <SpinnerButton className={classes.loginButton} disabled={loading} loading={loading} buttonLabel={'Register'} onClick={handleSubmit} />
        </div>
        )
    }
    if (!loading) {
        return (
            <div className={classes.form}>
            {
                notifications.wrongEmail ? (
                   <Alert severity="error">Wrong email</Alert>
                ) : null
            }
            <TextField onKeyDown={submitOnEnter} onChange={handleChange('email')}
                className={classes.textfield} name='email' label="Email"   value={values.email} variant="filled" />
               {
                    notifications.usernameTooShort ? (
              <Alert severity="error">Username's too short (3-18 char.)</Alert>
                    ) : null
                }
                {
                    notifications.usernameExists ? (
              <Alert severity="error">User with that email/username already exists</Alert>
                    ) : null
                    }
                {
                    notifications.usernameTooLong ? (
                        <Alert severity="error">Username's too long (3-18 char.)</Alert>
                    ) : null
                }
            <TextField onKeyDown={submitOnEnter} onChange={handleChange('username')}
            value={values.username}
                className={classes.textfield} name='username' label="Username" variant="filled" />
            <FormControl className={classes.textfield} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                onKeyDown={submitOnEnter}
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
                        <Alert severity="error">Password is too weak</Alert>
                    ) : null
                }
            </FormControl>
            <FormControl className={classes.textfield} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                <FilledInput
                onKeyDown={submitOnEnter}
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
            {
                    notifications.userRegistered ? (
              <Alert severity="success">Account has been created! You can login now.</Alert>
                    ) : null
                }
            <SpinnerButton className={classes.loginButton} loading={loading} buttonLabel={'Register'} onClick={handleSubmit} />
        </div>
        )
    }

    return (
        <></>
    );
};


export default withRouter(SignUp);