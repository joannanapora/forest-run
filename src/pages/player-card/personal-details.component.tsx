import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const PersonalDetails = ({ age, sex, from, city, country, languages }:
    { age: number, sex: string, from: string, city: string, country: string, languages: string[] }) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            personalDetails: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%'
            },
            typo: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }
        }
        ));

    const classes = useStyles();


    return (
        <div className={classes.personalDetails}>
            <Typography color='primary'>
                Personal Details:
    </Typography>
            <Typography color='secondary'>
                age/sex
            </Typography>
            <Typography className={classes.typo}>
                {age}/{sex}
            </Typography>
            <Typography color='secondary'>
                from
            </Typography>
            <Typography className={classes.typo}>
                {from}
            </Typography>
            <Typography color='secondary'>
                location
            </Typography>
            <Typography className={classes.typo}>
                {city},{country}
            </Typography>
            <Typography color='secondary'>
                languages
            </Typography>
            <Typography className={classes.typo}>
                {languages}
            </Typography>
        </div>
    );
}


export default PersonalDetails;