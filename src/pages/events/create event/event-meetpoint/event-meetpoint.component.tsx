import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',

            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

const MeetingPoint = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="standard-textarea"
                label="Meeting Point"
                multiline
            />
            <TextField
                id="standard-textarea"
                label="Event Description"
                multiline
            />
        </form>
    );
}


export default MeetingPoint;