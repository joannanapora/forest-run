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
                    {when},{date},{time}
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