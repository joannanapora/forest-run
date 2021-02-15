import StripeCheckout from 'react-stripe-checkout';

const Stripe = ({ donation, handleToken }) => {

    const publishableKey = 'pk_test_51I5qbsAzH5WZ6wWk5bFSySgNcJhsoMBalUfRP92hvr9lT2TnxrjnQn8TZqiMeyOUnL1ULpq0KYTiCXQcPAoZPxTZ00253Mx3bz';
    const donationStripe = donation * 100;

    return (
        <StripeCheckout
            image="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/46-512.png"
            name="Run Forest, Run"
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
