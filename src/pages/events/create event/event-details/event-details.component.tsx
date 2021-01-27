import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { usePersonalStyles } from './event-details.styles';
import { InputAdornment, TextField } from '@material-ui/core';

const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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


const PersonalSelect = () => {
    const classes = usePersonalStyles();
    const [langudatesList, setLangudatesList] = React.useState<string[]>([]);
    const [place, setPlace] = React.useState<string>('');
    const [location, setLocation] = React.useState<string>('');
    const [date, setdate] = React.useState<string>('');
    const [distance, setDistance] = React.useState<string>(null);

    const handleSingleSelect = (event: React.ChangeEvent<{ value: string, name: string }>) => {
        if (event.target.name === 'date') {
            setdate(event.target.value);
        }
        if (event.target.name === 'place') {
            setPlace(event.target.value);
        }
        if (event.target.name === 'location') {
            setLocation(event.target.value);
        }
    };

    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistance(event.target.value);
    };


    return (
        <div className={classes.favselects}>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">DATE</InputLabel>
                <Select
                    name='date'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    onChange={handleSingleSelect}
                >
                    {DATES.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {date === 'one-time event (choose date)' ?
                <TextField
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
                    id="time"
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
                    value={place}
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
                    value={distance}
                    onChange={handleDistanceChange}
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