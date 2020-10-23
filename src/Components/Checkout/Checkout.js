import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import publicKey from '../../stripe';
import axios from 'axios';

const Checkout = props => {
    const onToken = async token => {

        token.card = void 0
        await axios('/api/payment', {token, amount: 100}).then(res => {
            alert('Payment Submitted')
        }).catch(err => console.log(err))
    }

    return (
        <section>
            <StripeCheckout 
                token={onToken}
                stripeKey={publicKey}
                amount={100}
                shippingAddress={true}
            />
        </section>
    )
}

export default Checkout;