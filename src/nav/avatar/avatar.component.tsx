import React, { useEffect, useState } from 'react';
import { useAvatarStyles } from './avatar.styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, IconButton, TextField, } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Alert } from '@material-ui/lab';

const Username = () => {
    const classes = useAvatarStyles();
    const [usernameButton, isUsernameClicked]: [boolean, any] = useState(false);
    const [username, setUsername]: [string, any] = useState('cesarzowa');
    const [error, setError]: [boolean, any] = useState(false);
    const [success, setSuccess]: [boolean, any] = useState(false);

    useEffect(() => {
    }, [error, success, username])

    const changeUsername = () => {
        isUsernameClicked(true);
        setError(false);
        setSuccess(false);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };


    const acceptChange = () => {
        if (username.length < 3 || username.length > 19) {
            setError(true);
            setSuccess(false);
            offAlert();
        } else {
            setSuccess(true);
            setError(false);
            isUsernameClicked(false);
            offAlert();
        }
    }

    const offAlert = () => {
        setTimeout(() => {
            setError(false);
            setSuccess(false);
        }, 5000);
    }

    return (
        <div className={classes.root}>
            {usernameButton ?
                <div>
                    <TextField
                        onChange={handleUsernameChange}
                        id="outlined-margin-dense"
                        value={username}
                        className={classes.textField}
                        helperText="3-18 char."
                        variant="outlined" />
                    <IconButton color="primary" onClick={acceptChange} aria-label="accept-username" component="span">
                        <CheckIcon />
                    </IconButton>
                </div>
                :
                <Button onClick={changeUsername}>{username}</Button>}
            {
                success ? (
                    <div className={classes.alertContainer} ><Alert severity="success">Username has been changed!</Alert></div>
                ) : null}
            {
                error ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Username is wrong!</Alert></div>
                ) : null
            }
            <Avatar alt="cs-go-player" className={classes.large} src="https://blog.mapmyrun.com/wp-content/uploads/2017/07/5-Runners-Share-Their-Morning-Routines-Rachel.jpg" />
            <div className={classes.profileButtons}>
            </div>
        </div >
    );
};

export default Username;