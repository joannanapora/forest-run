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
            <Card >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Run Forest, Run
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        The site is dedicated to runners from all over London and the surrounding area. <br />
                        Main goal is to organize organize people who would like to enjoy the sport together.<br />
                        It is much safer, more fun and motivating.

          </Typography>
                </CardContent>
                <div className={classes.donate}>
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            type='number'
                            id="standard-adornment-amount"
                            value={amount}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">£</InputAdornment>}
                        />
                        <div className={classes.donateButton}><Stripe handleToken={handleToken} donation={amount}></Stripe></div>
                    </FormControl>
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