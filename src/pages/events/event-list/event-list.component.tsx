import React, { Dispatch, SetStateAction, useState, useEffect, useCallback } from 'react';
import UpcomingEvent from '../event-card/event.component';
import { useEventListStyles } from './event-list.styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import { GET_EVENTS } from '../../../grapQL/event/event.query';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Alert from '@material-ui/lab/Alert';
import { format } from 'date-fns';
import { mapWhenToOptions } from '../../../models/when.enum';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { ASSIGN_TO_EVENT, UNASSIGN_TO_EVENT } from '../../../grapQL/event/event.mutation';

const EventList = () => {
    const classes = useEventListStyles();
    const [checked, setChecked]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [isClicked, setIsClicked]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    let { loading, error, data } = useQuery(GET_EVENTS, {
        variables: {
            filters: {
                me: false,
            }
        },
    });

    const [assignToEvent] = useMutation(ASSIGN_TO_EVENT, {

    });

    const [unassignToEvent] = useMutation(UNASSIGN_TO_EVENT, {

    });

    if (error) {
        return (
            <Alert severity="error">Ooops! Try again later.</Alert>)
    }

    if (!data) {
        return (
            <>LOADING</>
        )
    };

    if (loading) {
        return (
            <>LOADING</>
        )
    };

    const handleChange = (prev: React.ChangeEvent<HTMLInputElement>) => {
        setChecked((prev) => !prev);
    };

    const handleSort = () => {
    }

    const handleClickToJoin = (eventId, isAssigned) => {
        setIsClicked(!isClicked);

        if (!isAssigned) {
            assignToEvent(
                {
                    variables: {
                        eventId: eventId
                    }
                }
            );
        }
        else {
            {
                unassignToEvent(
                    {
                        variables: {
                            eventId: eventId
                        }
                    }
                );
            };
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
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleSort}
                            >
                                Date
      </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleSort}
                            >
                                Distance
      </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleSort}
                            >
                                Popular
      </Button>
                        </Paper>
                    </Fade>
                </div>
            </div>
            <Grid item xs={12}>
                <Grid container justify="space-evenly" spacing={2}>
                    {
                        data.events.map((event) => {
                            return (<Grid key={event.id} item>
                                <UpcomingEvent
                                    location={event.location}
                                    distance={event.distance}
                                    image={"https://i.pinimg.com/564x/42/cc/62/42cc624233f1d0a1e3607bcc6bb52fca.jpg"}
                                    description={event.description}
                                    date={format(new Date(event.date), 'dd-MM-yyyy')}
                                    organizerName={event.organizerName}
                                    organizerPhoneNumber={event.organizerPhoneNumber}
                                    meetingPoint={event.meetingPoint}
                                    time={event.time}
                                    when={null}
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
        </div>
    );
}

export default EventList;
