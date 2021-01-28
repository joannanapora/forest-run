import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Stripe from '../../stripe/stripe.component';
import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { useDonateStyles } from './donate.styles';
import { Alert } from '@material-ui/lab';


export default function ImgMediaCard() {
    const classes = useDonateStyles();
    const [amount, setAmount]: [string, any] = React.useState('');
    const [donated, showDonated]: [boolean, any] = useState(false);

    useEffect(() => {
    }, [donated, amount])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '0' || event.target.value === '-') {
            setAmount('1');
        }
        else {
            setAmount(event.target.value);
        }
    };

    const offAlert = () => {
        setTimeout(() => {
            showDonated(false);
        }, 10000);
    }

    const handleToken = () => {
        showDonated(true);
        setAmount('');
        offAlert();
    }

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
                    <Stripe handleToken={handleToken} donation={amount}></Stripe>
                    {
                        donated ? (
                            <div className={classes.alertContainer} ><Alert severity="success">Thank you for donation!</Alert></div>
                        ) : null
                    }
                </div>
            </Card>
        </div>
    );
}