import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield: {
            width: '100%',
            margin: '1vw 0'

        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        loginButton: {
            margin: '2vw 0'
        }
    }));

interface State {
    username: string;
    password: string;
    showPassword: boolean;
}

const SignIn = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        username: '',
        password: '',
        showPassword: false,
    });

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
            alert("Username's too short. (min. 3 chars)");
            return;
        }
        if (values.password.length < 8) {
            alert("Password's too short. (min. 8 chars)");
            return;
        }
    };



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
            <Button onClick={handleSubmit} className={classes.loginButton} variant="contained" color="primary">
                Submit
</Button>
        </div>
    );
};


export default SignIn;