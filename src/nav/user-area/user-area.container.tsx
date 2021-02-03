import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAvatarStyles } from './user-area.styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../store-redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { IUser } from '../../store-redux/index'

const Username = ({ user }: { user: IUser }) => {

    const classes = useAvatarStyles();
    const [usernameButton, isUsernameClicked]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [usernameInput, setUsernameInput]: [string, Dispatch<SetStateAction<string>>] = useState(user?.username || "My Username");
    const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setUsernameInput("My Username")
        }
    }, [user]);

    const changeUsername = () => {
        isUsernameClicked(true);
        setError(false);
        setSuccess(false);
    }

    const handleUsernameChangeInput = (event) => {
        setUsernameInput(event.target.value);
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            if (usernameInput.length < 3 || usernameInput.length > 19) {
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
                        onChange={handleUsernameChangeInput}
                        id="outlined-margin-dense"
                        value={usernameInput}
                        className={classes.textField}
                        variant="outlined" />
                </div>
                :
                <div className={classes.usernameButton}>
                    <Button disabled={usernameInput === "My Username"} onClick={changeUsername}>{usernameInput}</Button>
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
            <Avatar alt="cs-go-player" className={classes.large}
                src="https://www.freelogodesign.org/file/app/client/thumb/677a71e1-9743-4516-b642-5efce841f31e_200x200.png?1612293369136" />
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