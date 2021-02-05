import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { usePersonalStyles } from './event-details.styles';
import { InputAdornment, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const DATES = [
    { name: 'one time event', id: 0 },
    { name: 'everyday', id: 1 },
    { name: 'weekends', id: 2 },
    { name: 'saturdays', id: 3 },
    { name: 'sundays', id: 4 },
    { name: 'two times a week', id: 5 },
    { name: 'three times a week', id: 6 },
    { name: 'four times a week', id: 7 },
    { name: 'five times a week', id: 8 },
];



const PersonalSelect = ({ timeValue, dateValue, locationValue, distanceValue, changeTime, changeDate,
    whenValue, changeWhen, changeDistance, changeLocation, whenRequiredAlert, locationRequiredAlert, distanceRequiredAlert, timeRequiredAlert, dateRequiredAlert }) => {

    const classes = usePersonalStyles();


    useEffect(() => { }, [dateRequiredAlert, timeRequiredAlert, distanceRequiredAlert, locationRequiredAlert])

    return (
        <div className={classes.favselects}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">WHEN</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={whenValue}
                    onChange={changeWhen}
                >
                    {DATES.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {
                whenRequiredAlert ? (
                    <div className={classes.alert}><Alert severity="error">Field above is required </Alert></div>
                ) : null
            }
            {
                whenValue === 'one time event' ?
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker className={classes.textField} value={dateValue} onChange={changeDate} />
                    </MuiPickersUtilsProvider>
                    :
                    null
            }
            {
                dateRequiredAlert ? (
                    <div className={classes.alert}><Alert severity="error">Field above is required </Alert></div>
                ) : null
            }
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <TimePicker className={classes.textField} value={timeValue} onChange={changeTime} />

            </MuiPickersUtilsProvider>
            {
                timeRequiredAlert ? (
                    <div className={classes.alert}><Alert severity="error">Field above is required </Alert></div>
                ) : null
            }
            <TextField
                className={classes.textField}
                value={locationValue}
                id="standard-textarea"
                label="Location"
                onChange={changeLocation}
            />
            {
                locationRequiredAlert ? (
                    <div className={classes.alert}><Alert severity="error">Field above is required </Alert></div>
                ) : null
            }
            <FormControl className={classes.formControl}>
                <Input
                    name='distance'
                    id="standard-adornment-weight"
                    value={distanceValue}
                    onChange={changeDistance}
                    endAdornment={<InputAdornment position="end">Miles</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'miles',
                    }}
                />
            </FormControl>
            {
                distanceRequiredAlert ? (
                    <div className={classes.alert}><Alert severity="error">Field above is required </Alert></div>
                ) : null
            }
        </div>
    );
};

export default PersonalSelect;