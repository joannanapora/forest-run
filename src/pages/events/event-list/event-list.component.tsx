import React from 'react';
import UpcomingEvent from '../event-card/event.component';
import { useEventListStyles } from './event-list.styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';

import SortIcon from '@material-ui/icons/Sort';

const events = [
    {
        id: 0,
        date: '12 March 2021, 7;00 pm',
        title: 'Hyde Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://www.parkgrandhydepark.co.uk/blog/wp-content/uploads/2017/08/Diana-Princess-of-Wales-Memorial-Fountain-Hyde-Park-London.jpg',
        distance: 2,
    },
    {
        id: 1,
        date: '16 February 2021, 7;00 am',
        title: 'Princess Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://www.towerhamlets.gov.uk/images_and_video/Leisure-and-culture/Parks-and-open-spaces/Mile_End_Park.png',
        distance: 4,
    },
    {
        id: 2,
        date: '29 March 2021, 6;00 pm',
        title: 'Quenns Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://www.womensrunning.com/wp-content/uploads/sites/2/2016/09/nicest-people.jpg?resize=630%2C420',
        distance: 10,
    },
    {
        id: 3,
        date: '29 March 2021, 6;00 pm',
        title: 'Quenns Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://www.twincities.com/wp-content/uploads/2019/06/jmp-mile-003.jpg',
        distance: 4,
    },
    {
        id: 4,
        date: '16 February 2021, 7;00 am',
        title: 'Princess Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://www.towerhamlets.gov.uk/images_and_video/Leisure-and-culture/Parks-and-open-spaces/Mile_End_Park.png',
        distance: 14,
    },
    {
        id: 5,
        date: '29 March 2021, 6;00 pm',
        title: 'Quenns Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://news.sanfordhealth.org/wp-content/uploads/2018/03/group-run.jpg',
        distance: 0.5,
    },
    {
        id: 6,
        date: '29 March 2021, 6;00 pm',
        title: 'Quenns Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://i.pinimg.com/564x/42/cc/62/42cc624233f1d0a1e3607bcc6bb52fca.jpg',
        distance: 8,
    },
    {
        id: 7,
        date: '29 March 2021, 6;00 pm',
        title: 'Quenns Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://news.sanfordhealth.org/wp-content/uploads/2018/03/group-run.jpg',
        distance: 4,
    },
    {
        id: 8,
        date: '29 March 2021, 6;00 pm',
        title: 'Quenns Park',
        description: 'We are group of 2 women and 2 men running in Hyde Park every day at 7pm. If you wanna join us you are more than welcome :)',
        image: 'https://i.pinimg.com/564x/42/cc/62/42cc624233f1d0a1e3607bcc6bb52fca.jpg',
        distance: 6,
    },
]


const EventList = () => {

    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const handleSort = () => {

    }
    const classes = useEventListStyles();

    return (
        <Grid container className={classes.root} spacing={1}>
            <div className={checked ? classes.rootfiltersOn : classes.rootfiltersOff}>
                <FormControlLabel
                    control={<Switch color="primary"
                        checked={checked} onChange={handleChange} />}
                    label="filters"
                />
                <div className={classes.container}>
                    <Fade in={checked}>
                        <Paper elevation={4} className={classes.paper}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleSort}
                            >
                                Date
      </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleSort}
                            >
                                Distance
      </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SortIcon />}
                                onClick={handleSort}
                            >
                                Popular
      </Button>
                        </Paper>
                    </Fade>
                </div>
            </div>
            <Grid item xs={12}>
                <Grid container justify="space-evenly" spacing={spacing}>
                    {
                        events.map((event) => {
                            return (<Grid key={event.id} item>
                                <UpcomingEvent title={event.title} distance={event.distance} image={event.image} description={event.description} date={event.date} />
                            </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EventList;
