import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { SvgIcon } from '@material-ui/core';
import PlayerAvatar from '../../menu-drawer/avatar.component';
import { ReactComponent as Steam } from '../../assets/iconmonstr-steam-2.svg';
import { ReactComponent as Faceit } from '../../assets/iconfinder_faceit_4691467.svg';
import DetailsPartOne from './personal-details.component';
import DetailsPartTwo from './game-datails.component';
import DetailsPartThree from './time-details.component';
import DetailsPartFour from './team-details.component';
import TeamMatesDetails from './team-mates.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            [theme.breakpoints.down("sm")]: {
                overflow: 'hidden'
            },
            [theme.breakpoints.up("md")]: {
                margin: '0 8vw',
                padding: theme.spacing(2),
                overflow: 'hidden'

            },
            [theme.breakpoints.up("lg")]: {
                padding: theme.spacing(2),
                margin: '0 8vw',
                overflow: 'hidden'
            },
        },
        button: {
            margin: theme.spacing(1),
        },
        paperUp: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(5),
            minHeight: '20vw',
            alignItems: 'center',
            height: '100%',
        },
        paperDown: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            padding: theme.spacing(5),
            minHeight: '12vw',
            alignItems: 'center',
            height: '100%',
        },
        profileLinks: {
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: theme.spacing(2),
        }
    }),
);

const MyPlayerCard = ({ ...props }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperUp}>
                        <PlayerAvatar />
                        <div className={classes.profileLinks}>
                            <SvgIcon> <Steam /></SvgIcon>
                            <SvgIcon><Faceit /></SvgIcon>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperUp}>
                        <DetailsPartOne age={27} city={'LONDON'} country={'UK'} from={'POLAND'} languages={['POLISH, ', 'ENGLISH']} sex={'F'} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperUp}>
                        <DetailsPartTwo maps={['INFERNO, ', 'DUST II, ', 'CACHE']} guns={['AK-47, ', 'M4A4, ', 'USP-S']} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperDown}>
                        <DetailsPartThree hours={['16-20']} timeZone={'GMT'} days={['ONCE A WEEK']} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperDown}>
                        <DetailsPartFour currentTeam={'LIONS'} lookingFor={false} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperDown}>
                        <TeamMatesDetails />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default MyPlayerCard;