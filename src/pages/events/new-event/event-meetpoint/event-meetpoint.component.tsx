import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useMeetingPointDetails } from './event-meetpoint.styles';


const MeetingPoint = ({ changeOrganizerName, changeOrganizerPhoneNumber, changeMeetingPoint, changeEventDescription, organizerNameValue, organizerPhoneNumberValue, meetingPointValue, eventDescriptionValue }) => {
    const classes = useMeetingPointDetails();

    return (
        <div className={classes.root}>
            <TextField
                value={organizerNameValue}
                id="standard-textarea"
                label="organizer's name"
                onChange={changeOrganizerName}
            />
            <TextField
                value={organizerPhoneNumberValue}
                id="standard-textarea"
                label="organizer's phone nr"
                onChange={changeOrganizerPhoneNumber}
            />
            <TextField
                className={classes.multilineInput}
                value={meetingPointValue}
                id="standard-textarea"
                label="Meeting Point"
                multiline
                onChange={changeMeetingPoint}
            />
            <TextField
                className={classes.multilineInput}
                value={eventDescriptionValue}
                id="standard-textarea"
                label="Event Description"
                multiline
                onChange={changeEventDescription}
            />
        </div>
    );
}


export default MeetingPoint;