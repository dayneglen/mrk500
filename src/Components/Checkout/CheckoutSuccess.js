import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = props => {
    return (
        <main>
            <section className='checkout-success'>
                <section className='checkout-img-container'>
                    <img src='https://mrk500.s3-us-west-1.amazonaws.com/Logo.png' alt='MRK500 logo' />
                </section>
               
                <h1>Congrats!!</h1>
                <h1>Your new look is on the way!</h1>
                <Link to={'/account'}>See Your Order Here</Link>
            </section>
        </main>
    )
}

export default CheckoutSuccess;

