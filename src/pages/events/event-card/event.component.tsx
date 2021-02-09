import React, { Dispatch, SetStateAction, useState } from 'react';
import clsx from 'clsx';

import { mapOptionsToWhen, When } from '../../../models/when.enum';
import { useEventStyles } from './event.styles';

import { CardContent, CardActions, CardHeader, Card, CardMedia, Collapse, IconButton, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PeopleIcon from '@material-ui/icons/People';



const UpcomingEvent = ({ location, date, image, description, when, distance, time, organizerName, action, organizerPhoneNumber, meetingPoint, counter }) => {
    const classes = useEventStyles();
    const [expanded, setExpanded]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    const handleShowDescription = () => {
        setExpanded(!expanded);
    };


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Typography aria-label="recipe" className={classes.avatar}>
                        {distance} miles
          </Typography>
                }
                action={action}
                title={location}
                subheader={<span>
                    {mapOptionsToWhen(when) !== When.ONE_TIME_EVENT ?
                        <span>·{when}  ·  {time}</span> : <span>{date}  ·  {time}</span>}

                </span>}
            />
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
                    <Typography paragraph>Meeting Point</Typography>
                    <Typography paragraph>
                        {meetingPoint}
                    </Typography>
                    <Typography paragraph>Description</Typography>
                    <Typography paragraph>
                        {description}
                    </Typography>
                    <Typography paragraph>Organizer</Typography>
                    <Typography paragraph>
                        <span>{organizerName}<br />{organizerPhoneNumber}</span>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};



export default UpcomingEvent;