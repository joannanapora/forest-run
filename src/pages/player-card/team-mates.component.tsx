import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export const mockMates = [
    {
        name: "Izak",
        id: 0,
        teamName: 'LIONS'
    },
    {
        name: "AyJay",
        id: 1,
        teamName: 'LIONS'
    },
    {
        name: "Curly",
        id: 2,
        teamName: 'LIONS'
    },
    {
        name: "Levy",
        id: 3,
        teamName: 'LIONS'
    },];

const TeamMatesDetails = ({ mates }:
    { mates?: string[] }) => {


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
                Teammates:
                </Typography>
            {
                mockMates.map((element) => (
                    <Typography key={element.id} className={classes.typo}>
                        <ArrowRightIcon />{element.name}<ArrowLeftIcon />
                    </Typography>
                ))
            }
        </div>
    );
}


export default TeamMatesDetails;