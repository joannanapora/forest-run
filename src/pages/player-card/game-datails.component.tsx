import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const GameDetails = ({ guns, maps, }:
    { guns: string[], maps: string[] }) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            gameDetails: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%'
            }
        }
        ));

    const classes = useStyles();


    return (
        <div className={classes.gameDetails}>
            <Typography color='primary'>
                Preferences:
            </Typography>
            <Typography color='secondary'>
                guns
            </Typography>
            <Typography>
                {guns}
            </Typography>
            <Typography color='secondary'>
                maps
            </Typography>
            <Typography>
                {maps}
            </Typography>
        </div>
    );
}


export default GameDetails;