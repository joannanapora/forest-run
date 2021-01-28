import React, { useState, useEffect } from 'react';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { useSignInStyles } from './sign-in.styles';

interface State {
    username: string;
    password: string;
    showPassword: boolean;
}

const SignIn = () => {
    const classes = useSignInStyles();
    const [values, setValues] = React.useState<State>({
        username: '',
        password: '',
        showPassword: false,
    });
    const [error, setError]: [boolean, any] = useState(false);


    useEffect(() => {
    }, [error])


    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (values.username.length < 3) {
            setError(true);
        } else { }
    };


    const offAlert = () => {
        setTimeout(() => {
            setError(false);
        }, 15000);
    }


    return (
        <div className={classes.form}>
            <TextField className={classes.textfield} name='playerUsername' label="Username" variant="filled" />
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
            {
                error ? (
                    <div className={classes.alertContainer} ><Alert onChange={offAlert} severity="error">Wrong email or password</Alert></div>
                ) : null
            }
            <Button onClick={handleSubmit} className={classes.loginButton} variant="contained" color="primary">
                Submit
</Button>
        </div>
    );
};


export default SignIn;