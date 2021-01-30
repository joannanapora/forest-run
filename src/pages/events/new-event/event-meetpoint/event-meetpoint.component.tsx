import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useMeetingPointDetails } from './event-meetpoint.styles';


const MeetingPoint = () => {
    const classes = useMeetingPointDetails();
    const [values, setValues] = useState({
        organizerName: '',
        organizerPhone: '',
        meetingPoint: '',
        eventDescription: '',
    });

    const handleChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                value={values.organizerName}
                id="standard-textarea"
                label="organizer's name"
                onChange={handleChange('organizerName')}
            />
            <TextField
                value={values.organizerPhone}
                id="standard-textarea"
                label="organizer's phone nr"
                onChange={handleChange('organizerPhone')}
            />
            <TextField
                className={classes.multilineInput}
                value={values.meetingPoint}
                id="standard-textarea"
                label="Meeting Point"
                multiline
                onChange={handleChange('meetingPoint')}
            />
            <TextField
                className={classes.multilineInput}
                value={values.eventDescription}
                id="standard-textarea"
                label="Event Description"
                multiline
                onChange={handleChange('eventDescription')}
            />
        </form>
    );
}


export default MeetingPoint;