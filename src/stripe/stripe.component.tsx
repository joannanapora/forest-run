import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = ({ donation }) => {

    const handleToken = () => {
    }

    const publishableKey = 'pk_test_51I5qbsAzH5WZ6wWk5bFSySgNcJhsoMBalUfRP92hvr9lT2TnxrjnQn8TZqiMeyOUnL1ULpq0KYTiCXQcPAoZPxTZ00253Mx3bz';
    const donationStripe = donation * 100;

    return (
        <StripeCheckout
            image="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg"
            name="Oh My Dog"
            description={`You are donating £${donation}`}
            label='Donate'
            panelLabel="Donate"
            amount={donationStripe}
            currency="GBP"
            stripeKey={publishableKey}
            token={handleToken}>
        </StripeCheckout>
    );
}


export default Stripe;
