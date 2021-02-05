import React, { Dispatch, SetStateAction, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Stripe from '../../stripe/stripe.component';
import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { useDonateStyles } from './donate.styles';
import { Alert } from '@material-ui/lab';


const Donate = () => {
    const classes = useDonateStyles();

    const [amount, setAmount]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [donated, showDonated]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);


    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        <br />
                        It is much safer, more fun and motivating.

          </Typography>
                    <Typography align='center' color='error'> <br />
                    Please, use fake card details:
            <br />4242 4242 4242 4242 || exp: 02/22 || cvv: 123</Typography>
                </CardContent>
                <div className={classes.donate}>
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            type='number'
                            id="standard-adornment-amount"
                            value={amount}
                            onChange={handleAmountChange}
                            startAdornment={<InputAdornment position="start">£</InputAdornment>}
                        />
                        <div className={classes.donateButton}><Stripe handleToken={handleToken} donation={amount}></Stripe></div>
                    </FormControl>
                    {
                        donated ? (
                            <Alert severity="success">Thank you for donation!</Alert>
                        ) : null
                    }
                </div>
            </Card>
        </div>
    );
};

export default Donate;