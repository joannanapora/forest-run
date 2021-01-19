import { SvgIcon, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ReactComponent as Loupe } from '../../assets/search.svg';
import Avatar from "@material-ui/core/Avatar";

const TeamDetails = ({ currentTeam, lookingFor }: { currentTeam?: string, lookingFor: boolean }) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            teamDetails: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%',
                alignItems: 'center',
            },
            haveTeam: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%',
                alignItems: 'center',
            },
            avatar: {
                width: theme.spacing(20),
                height: theme.spacing(20),
                padding: theme.spacing(2),
            }
        }
        ));

    const classes = useStyles();


    return (
        <div className={classes.teamDetails}>
            <Typography color='primary'>
                Current Team:
            </Typography>
            {lookingFor ?
                <div className={classes.haveTeam}>
                    <SvgIcon><Loupe /></SvgIcon>
                    <Typography color='secondary'>looking for team</Typography></div>
                :
                <div className={classes.haveTeam}>
                    <Avatar className={classes.avatar} src="https://image.ceneostatic.pl/data/article_picture/ae/24/24f8-c9ab-4c8a-a5ba-d1c53a90c847_large.jpg" />
                    <Typography color='secondary'>{currentTeam}</Typography>
                </div>
            }
        </div>
    );
}


export default TeamDetails;