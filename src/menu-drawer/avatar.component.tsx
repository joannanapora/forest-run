import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "column",
        },
        large: {
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
        profileLink: {
            marginTop: theme.spacing(5),
            "&:hover": {
                cursor: 'pointer',
            }
        }
    }
    ),
);

const PlayerAvatar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="cs-go-player" className={classes.large} src="https://i.pinimg.com/originals/b1/02/24/b10224ae75edd5debd06c44662cbcb30.png" />
            <Typography className={classes.profileLink} variant="h6" >cesarzowa</Typography>
        </div>
    );
}

export default PlayerAvatar;