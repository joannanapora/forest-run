import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Stripe from '../../stripe/stripe.component';
import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        maxWidth: '350px',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
    }
});

export default function ImgMediaCard() {
    const classes = useStyles();
    const [amount, setAmount]: [string, any] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '0' || event.target.value === '-') {
            setAmount('1');
        }
        else {
            setAmount(event.target.value);
        }
    };

    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <div className={classes.actions}>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Forest
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            We are runners from London. We connect people who are looking for others to run together.
                            It's safer, more fun and motivating.
          </Typography>
                    </CardContent>
                </div>
                <div className={classes.actions}>
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            type='number'
                            id="standard-adornment-amount"
                            value={amount}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">£</InputAdornment>}
                        />
                    </FormControl>
                    <Stripe donation={amount}></Stripe>
                </div>
            </Card>
        </div>
    );
}