import React, { useEffect, useState } from 'react';
import { useAvatarStyles } from './avatar.styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, IconButton, TextField, } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Alert } from '@material-ui/lab';
import {connect} from 'react-redux';
import { selectCurrentUser } from '../../store-redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const Username = ({user}) => {
    const classes = useAvatarStyles();
    const [usernameButton, isUsernameClicked]: [boolean, any] = useState(false);
    const [username, setUsername]: [string, any] = useState(user.username);
    const [error, setError]: [boolean, any] = useState(false);
    const [success, setSuccess]: [boolean, any] = useState(false);

    const changeUsername = () => {
        isUsernameClicked(true);
        setError(false);
        setSuccess(false);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
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
                <div className={classes.usernameButton}>
                    <TextField
                        onKeyDown={handleEnter}
                        onChange={handleUsernameChange}
                        id="outlined-margin-dense"
                        value={username}
                        className={classes.textField}
                        variant="outlined" />
                </div>
                :
                <div className={classes.usernameButton}>
                    <Button onClick={changeUsername}>{username}</Button>
                </div>}
            {
                success ? (
                    <div className={classes.alertContainer} ><Alert severity="success">Username changed!</Alert></div>
                ) : null
            }
            {
                error ? (
                    <div className={classes.alertContainer} ><Alert severity="error">Insert 3-18 characters!</Alert></div>
                ) : null
            }
            <Avatar alt="cs-go-player" className={classes.large} src="https://blog.mapmyrun.com/wp-content/uploads/2017/07/5-Runners-Share-Their-Morning-Routines-Rachel.jpg" />
        </div >
    );
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
});

export default connect(
    mapStateToProps,
    null)
    (Username);