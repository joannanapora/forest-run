import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import { validateEmail } from '../../shared/email-validation';

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
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    username: string;
}


const SignUp = ({ history }: any) => {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        username: '',
    });

    const handleSubmit = async event => {
        event.preventDefault();

        if (!validateEmail(values.email)) {
            alert("Email is wrong");
            return;
        }
        if (values.password !== values.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        if (values.username.length < 3) {
            alert("Username's too short. (min. 3 chars)");
            return;
        }
        if (values.password.length < 8) {
            alert("Password's too short. (min. 8 chars)");
            return;
        }


        /// connect to GRAPH QL

    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
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
            if (history) { history.push('/card-edit') };
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
                        <InputAdornment position="end">

                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button className={classes.loginButton} onClick={handleSubmit} variant="contained" color="primary">
                Register
</Button>
        </div>
    );
};


export default withRouter(SignUp);