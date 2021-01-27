import React from 'react';
import { useEventStyles } from './event.styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Star, StarBorder } from '@material-ui/icons';

interface ICardDetails {
    title: string
    date: string
    image: string
    description: string,
    distance: number,
}


const UpcomingEvent = ({ title, date, image, description, distance }: ICardDetails) => {
    const classes = useEventStyles();
    const [expanded, setExpanded]: [boolean, any] = React.useState(false);
    const [isFavourite, setIsFavourite]: [boolean, any] = React.useState(false);

    const handleExpandClick = () => {
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
                action={
                    <IconButton onClick={() => setIsFavourite(!isFavourite)} aria-label="settings">
                        {isFavourite ?
                            < Star />
                            :
                            < StarBorder />
                        }
                    </IconButton>
                }
                title={title}
                subheader={date}
            />
            <CardMedia
                className={classes.media}
                image={image}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
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