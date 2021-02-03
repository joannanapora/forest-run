import React, { Dispatch, SetStateAction, useState } from 'react';
import { useEventStyles } from './event.styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Alert from '@material-ui/lab/Alert';
import PeopleIcon from '@material-ui/icons/People';

interface ICardDetails {
    title: string
    date: string
    image: string
    description: string,
    distance: number,
}


const UpcomingEvent = ({ title, date, image, description, distance }: ICardDetails) => {
    const classes = useEventStyles();
    const [expanded, setExpanded]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [isFavourite, setIsFavourite]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [join, setJoin]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [remove, setRemove]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [counter, setCounter]: [number, Dispatch<SetStateAction<number>>] = useState(0);


    const handleShowDescription = () => {
        setExpanded(!expanded);
    };

    const handleClickToJoin = () => {
        setIsFavourite(!isFavourite);

        if (isFavourite) {
            setRemove(true);
            setJoin(false)
            offAlert();
            setCounter(counter - 1)
        } else {
            setJoin(true);
            setRemove(false);
            offAlert();
            setCounter(counter + 1)
        }
    }

    const offAlert = () => {
        setTimeout(() => {
            setJoin(false);
            setRemove(false);
        }, 4000);
    }


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Typography aria-label="recipe" className={classes.avatar}>
                        {distance} miles
          </Typography>
                }
                action={
                    <IconButton onClick={handleClickToJoin} aria-label="settings">
                        {isFavourite ?
                            < PeopleAltIcon color='primary' />
                            :
                            < PersonAddIcon color='secondary' />
                        }
                    </IconButton>
                }
                title={title}
                subheader={date}
            />
            {
                join ? (
                    <div className={classes.alertContainer} ><Alert onChange={offAlert} severity="success">You joined the event!</Alert></div>
                ) : null
            }
            {
                remove ? (
                    <div className={classes.alertContainer} ><Alert onChange={offAlert} severity="error">You left the event! </Alert></div>
                ) : null
            }
            <CardMedia
                className={classes.media}
                image={image}
            />
            <CardActions disableSpacing>
                < PeopleIcon /><Typography className={classes.counter} >{counter}</Typography>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleShowDescription}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>description:</Typography>
                    <Typography paragraph>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default UpcomingEvent;