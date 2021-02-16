import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useUserAreaStyles } from './user-area.styles';

import { Button, TextField, Typography, } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Alert } from '@material-ui/lab';

import { selectCurrentUser } from '../../store-redux/user/user.selectors';
import { IUser, setCurrentUser } from '../../store-redux/index'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { UPDATE_USERNAME } from '../../grapQL/user/user.mutation';
import { useMutation } from '@apollo/react-hooks';


interface IAlert {
    usernameIncorrect: boolean;
    usernameIsTaken: boolean;
    usernameChanged: boolean;
    internalBackendError: boolean;
};

const Username = ({ user, dispatchSetCurrentUser }: { user: IUser, dispatchSetCurrentUser }) => {

    const classes = useUserAreaStyles();
    const [usernameButton, setUsernameClicked]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [usernameInput, setUsernameInput]: [string, Dispatch<SetStateAction<string>>] = useState(user?.username || 'My Profile');
    const [alert, setAlert]: [IAlert, Dispatch<SetStateAction<IAlert>>] = useState({
        usernameIncorrect: false,
        usernameIsTaken: false,
        usernameChanged: false,
        internalBackendError: false
    });

    useEffect(() => {
    }, [usernameInput, usernameButton]);

    const changeUsername = () => {
        setUsernameClicked(true);
        setAlert({
            usernameIncorrect: false,
            usernameIsTaken: false,
            usernameChanged: false,
            internalBackendError: false
        })
    }

    const handleUsernameChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlert({
            usernameIncorrect: false,
            usernameIsTaken: false,
            usernameChanged: false,
            internalBackendError: false
        });
        setUsernameInput(event.target.value);
    };

    const [updateUsername] = useMutation(UPDATE_USERNAME, {
        onCompleted: (result) => {
            setAlert({ ...alert, usernameChanged: true });
            setUsernameClicked(false);
            dispatchSetCurrentUser({
                username: result.updateUsername.username
            });
        },
        onError: (error) => {
            if ((error.graphQLErrors[0].message as any).statusCode === 409) {
                setAlert({ ...alert, usernameIsTaken: true })
            }
            if ((error.graphQLErrors[0].message as any).statusCode === 500) {
                setAlert({ ...alert, internalBackendError: true })
            }
        }
    });


    const handleEnter = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter") {
            if (usernameInput.length < 3 || usernameInput.length > 19) {
                setAlert({
                    ...alert,
                    usernameIncorrect: true,
                })
            };
            if (usernameInput === user.username) {
                setUsernameClicked(false)
                return
            };
            if (usernameInput.indexOf(' ') >= 0) {
                return
            };
            updateUsername(
                {
                    variables: {
                        username: usernameInput
                    }
                }
            );
        };
    };


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
                    {user?.username ?
                        <Button onClick={changeUsername}>{usernameInput}</Button>
                        :
                        <Typography>My Profile</Typography>
                    }
                </div>}
            {
                alert.usernameChanged ? (
                    <div className={classes.alert}><Alert severity="success">Username changed!</Alert></div>
                ) : null
            }
            {
                alert.usernameIncorrect ? (
                    <div className={classes.alert}><Alert severity="error">Insert 3-18 characters!</Alert></div>
                ) : null
            }
            {
                alert.internalBackendError ? (
                    <div className={classes.alert}><Alert severity="error">Something went wrong! Try later.</Alert></div>
                ) : null
            }
            {
                alert.usernameIsTaken ? (
                    <div className={classes.alert}><Alert severity="error">Username is already taken.</Alert></div>
                ) : null
            }
            <Avatar alt="forest-app" className={classes.large}
                src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/46-512.png" />
        </div >
    );
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});



export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (Username);