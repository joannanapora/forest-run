import React, { Dispatch, SetStateAction, useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { usePersonalStyles } from './event-details.styles';
import { InputAdornment, TextField } from '@material-ui/core';

const DATES = [
    { name: 'one-time event (choose date)', id: 0 },
    { name: 'everyday', id: 1 },
    { name: 'weekends', id: 2 },
    { name: 'saturdays', id: 3 },
    { name: 'sundays', id: 4 },
    { name: 'two times a week', id: 5 },
    { name: 'three times a week', id: 6 },
    { name: 'four times a week', id: 7 },
    { name: 'five times a week', id: 8 },

];

const WHERE = [
    { name: 'Hyde Park', id: 0 },
    { name: 'Princess Park', id: 1 },
    { name: 'Quenns Park', id: 2 },
];

interface IEventDetails {
    time: string;
    place: string;
    when: string;
    distance: string;
    date: string;
};

const PersonalSelect = () => {
    const classes = usePersonalStyles();
    const [eventDetails, setEventDetails]: [IEventDetails, Dispatch<SetStateAction<IEventDetails>>] = useState({
        time: '',
        place: '',
        date: '',
        distance: '',
        when: '',
    });

    const handleSingleSelect = (event: React.ChangeEvent<{ value: string, name: string }>) => {
        if (event.target.name === 'date') {
            setEventDetails({ ...eventDetails, date: event.target.value });
        }
        if (event.target.name === 'place') {
            setEventDetails({ ...eventDetails, place: event.target.value });

        }
        if (event.target.name === 'time') {
            setEventDetails({ ...eventDetails, time: event.target.value });

        }
        if (event.target.name === 'distance') {
            setEventDetails({ ...eventDetails, distance: event.target.value });

        }
        if (event.target.name === 'when') {
            setEventDetails({ ...eventDetails, when: event.target.value });

        }
    };

    return (
        <div className={classes.favselects}>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">DATE</InputLabel>
                <Select
                    name='when'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventDetails.when}
                    onChange={handleSingleSelect}
                >
                    {DATES.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {eventDetails.date === 'one-time event (choose date)' ?
                <TextField
                    name='date'
                    value={eventDetails.date}
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2021-01-01T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                :
                <TextField
                    value={eventDetails.time}
                    name="time"
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300
                    }}
                />

            }
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">PLACE</InputLabel>
                <Select
                    name='place'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventDetails.place}
                    onChange={handleSingleSelect}
                >
                    {WHERE.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Input
                    name='distance'
                    id="standard-adornment-weight"
                    value={eventDetails.distance}
                    onChange={handleSingleSelect}
                    endAdornment={<InputAdornment position="end">Miles</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'miles',
                    }}
                />
            </FormControl>
        </div>
    );
};

export default PersonalSelect;