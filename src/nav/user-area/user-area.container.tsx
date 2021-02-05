import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useUserAreaStyles } from './user-area.styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../store-redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { IUser, setCurrentUser } from '../../store-redux/index'
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
    const [usernameInput, setUsernameInput]: [string, Dispatch<SetStateAction<string>>] = useState(user?.username || "My Username");
    const [alert, setAlert]: [IAlert, Dispatch<SetStateAction<IAlert>>] = useState({
        usernameIncorrect: false,
        usernameIsTaken: false,
        usernameChanged: false,
        internalBackendError: false
    });

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setUsernameInput("My Username")
        }
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
        setUsernameInput(event.target.value);
    };

    const [updateUsername, { loading, error, data }] = useMutation(UPDATE_USERNAME, {
        onCompleted: () => {
            setAlert({ ...alert, usernameChanged: true });
            setUsernameClicked(false);
            dispatchSetCurrentUser({
                username: data.login.username
            });
        },
        onError: (error) => setAlert({ ...alert, usernameChanged: true }),
    });



    const handleEnter = (event) => {
        if (event.key === "Enter") {
            if (usernameInput.length < 3 || usernameInput.length > 19) {
                setAlert({
                    ...alert,
                    usernameIncorrect: true,
                })
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
                    <Button disabled={usernameInput === "My Username"} onClick={changeUsername}>{usernameInput}</Button>
                </div>}
            {
                alert.usernameChanged ? (
                    <Alert severity="success">Username changed!</Alert>
                ) : null
            }
            {
                alert.usernameIncorrect ? (
                    <Alert severity="error">Insert 3-18 characters!</Alert>
                ) : null
            }
            {
                alert.internalBackendError ? (
                    <Alert severity="error">Something went wrong! Try later.</Alert>
                ) : null
            }
            {
                alert.usernameIsTaken ? (
                    <Alert severity="error">Username is already taken.</Alert>
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

const mapDispatchToProps = dispatch => ({
    dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user))
});



export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (Username);