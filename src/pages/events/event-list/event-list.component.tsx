import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import UpcomingEvent from '../event-card/event.component';
import { Grid, Switch, Paper, Fade, Button, IconButton, Typography } from '@material-ui/core';

import { mapWhenToOptions } from '../../../models/when.enum';
import { useEventListStyles } from './event-list.styles';

import { format } from 'date-fns';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SortIcon from '@material-ui/icons/Sort';
import Alert from '@material-ui/lab/Alert';

import { selectCurrentUser } from '../../../store-redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { IUser } from '../../../store-redux';
import { connect } from 'react-redux';

import { GET_EVENTS, ASSIGN_TO_EVENT, UNASSIGN_TO_EVENT } from '../../../grapQL';
import { useQuery, useMutation } from '@apollo/react-hooks';

import CircularIndeterminate from '../../../shared/spinner.component';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


interface IAlerts {
    pleaseLogin: boolean;
    joined: boolean;
    left: boolean;
    internalBackendError: boolean;
}

interface IFilters {
    distance: string;
    joined: boolean;
    popular: string;
}

const EventList = ({ user }: { user: IUser }) => {
    const classes = useEventListStyles();
    const [checked, setChecked]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [isClicked, setIsClicked]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [filter, setFilter]: [IFilters, Dispatch<SetStateAction<IFilters>>] = useState({
        distance: "",
        popular: "",
        joined: false,
    });

    useEffect(() => {
        refetch()
    }, [filter])


    const [alert, setAlert]: [IAlerts, Dispatch<SetStateAction<IAlerts>>] = useState({
        pleaseLogin: false,
        joined: false,
        left: false,
        internalBackendError: false,
    });

    let { loading, error, data, refetch } = useQuery(GET_EVENTS, {
        variables: {
            filters: {
                me: false,
                participateCounter: filter.popular,
                distance: filter.distance,
                joined: filter.joined,
            }
        },
    },
    );

    const [assignToEvent] = useMutation(ASSIGN_TO_EVENT, {
        onCompleted: () => {
            refetch();
            setAlert({ ...alert, joined: true, left: false })

        },
        onError: (error) => {
            if ((error.graphQLErrors[0].message) === "Cannot read property 'sub' of undefined") {
                setAlert({ ...alert, pleaseLogin: true })
            }
            if ((error.graphQLErrors[0].message as any).statusCode === 500) {
                setAlert({ ...alert, internalBackendError: true })
            }
        }
    });

    const [unassignToEvent] = useMutation(UNASSIGN_TO_EVENT, {
        onCompleted: () => {
            refetch();
            setAlert({ ...alert, left: true, joined: false })
        },
        onError: (error) => {
            if ((error.graphQLErrors[0].message) === "Cannot read property 'sub' of undefined") {
                setAlert({ ...alert, pleaseLogin: true })
            }
            if ((error.graphQLErrors[0].message as any).statusCode === 500) {
                setAlert({ ...alert, internalBackendError: true })
            }
        }
    });

    if (error) {
        return (
            <div className={classes.alert}><Alert severity="error">Ooops! Try again later.</Alert></div>)
    };

    const handleChange = (prev: React.ChangeEvent<HTMLInputElement>) => {
        setChecked((prev) => !prev);
        setAlert({
            ...alert,
            pleaseLogin: false,
            joined: false,
            left: false,
        })
    };

    const handleDistance = () => {

        setFilter({
            distance: filter.distance !== "DESC" ? "DESC" : "ASC",
            popular: undefined,
            joined: null
        });
        setAlert({
            ...alert,
            pleaseLogin: false,
            joined: false,
            left: false,
        })
    };

    const handlePopular = () => {
        setFilter({
            popular: filter.popular !== "DESC" ? "DESC" : "ASC",
            distance: undefined,
            joined: null,
        });
        setAlert({
            ...alert,
            pleaseLogin: false,
            joined: false,
            left: false,
        })
    };

    const handleJoined = () => {
        setFilter({
            ...filter, joined: !filter.joined,
        });
        setAlert({
            ...alert,
            pleaseLogin: false,
            joined: false,
            left: false,
        })
    };


    const handleClickToJoin = (eventId, isAssigned) => {
        setIsClicked(!isClicked);

        if (!isAssigned) {
            assignToEvent(
                {
                    variables: {
                        eventId: eventId
                    },
                },
            );
        }
        else {
            unassignToEvent(
                {
                    variables: {
                        eventId: eventId
                    },
                }
            );
        }

    }

    return (
        <div className={classes.eventListPage}>
            <div className={classes.rootfilters}>
                <FormControlLabel
                    control={<Switch color="primary"
                        checked={checked} onChange={handleChange} />}
                    label={checked ? '' : 'filters'}
                />
                <div className={classes.container}>
                    <Fade in={checked}>
                        <Paper elevation={4} className={classes.paper}>
                            <Button
                                variant="contained"
                                color={filter.distance ? "primary" : "secondary"}
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleDistance}
                            >
                                Miles
      </Button>
                            <Button
                                variant="contained"
                                color={filter.popular ? "primary" : "secondary"}
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handlePopular}
                            >
                                Popular
      </Button>
                            <Button
                                variant="contained"
                                color={filter.joined ? "primary" : "secondary"}
                                size="small"
                                className={classes.button}
                                startIcon={filter.joined ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                                onClick={handleJoined}
                            >
                                Joined
                            </Button>
                        </Paper>
                    </Fade>
                </div>
            </div>
            {
                !data || loading ?
                    <CircularIndeterminate />
                    :
                    <Grid item xs={12}>
                        {
                            alert.pleaseLogin ?
                                <div className={classes.mutationAlert}><Alert severity="warning">Please login to join the event.</Alert></div>
                                : null
                        }
                        {
                            alert.joined ?
                                <div className={classes.mutationAlert}><Alert severity="success">You have joined the event.</Alert></div>
                                : null
                        }
                        {
                            alert.left ?
                                <div className={classes.mutationAlert}><Alert severity="error">You have left the event.</Alert></div>
                                : null
                        }
                        <Grid container justify="space-evenly" spacing={2}>
                            {
                                data?.events.length < 1 && filter.joined ?
                                    <div className={classes.mutationAlert}><Typography>There are no events here.</Typography></div>
                                    :
                                    null
                            }
                            {
                                data?.events.length < 1 && !filter.joined ?
                                    <div className={classes.mutationAlert}><Typography>There are no upcoming events.</Typography></div>
                                    :
                                    null
                            }
                            {
                                data?.events?.map((event) => {
                                    return (<Grid key={event.id} item>
                                        <UpcomingEvent
                                            location={event.location}
                                            distance={event.distance}
                                            image="https://cdn.dribbble.com/users/1016207/screenshots/6380353/58.jpg?compress=1&resize=400x300"
                                            description={event.description}
                                            date={format(new Date(event.date), 'dd/MM/yyyy')}
                                            organizerName={event.organizerName}
                                            organizerPhoneNumber={event.organizerPhoneNumber}
                                            meetingPoint={event.meetingPoint}
                                            time={new Date(Number(event.time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            when={mapWhenToOptions(event.when)}
                                            counter={event.participateCounter}
                                            action={event.isAssign ?
                                                <IconButton onClick={() => handleClickToJoin(event.id, event.isAssign)} aria-label="settings">
                                                    < PeopleAltIcon color='primary' />
                                                </IconButton>
                                                :
                                                <IconButton onClick={() => handleClickToJoin(event.id, event.isAssign)} aria-label="settings">
                                                    < PersonAddIcon color='secondary' />
                                                </IconButton>}
                                        />
                                        {event.isAssign ?
                                            isClicked : !isClicked}
                                    </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
});


export default connect(
    mapStateToProps,
    null)
    (EventList);