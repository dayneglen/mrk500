import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { getCart } from '../../redux/cartReducer';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import publicKey from '../../stripe';

const stripePromise = loadStripe(publicKey);


const Cart = props => {
    useEffect(() => {
        getCurrentCart();
    }, [])
    const [cart, setCart] = useState([]);

    // Function to handle checkout and send message for stripe payment
    const handleCheckout = async () => {
        const email = props.userReducer.user;
        if (!email) {
            alert('Please login to finish checkout');
            props.history.push('/login')
        } else {
            const stripe = await stripePromise;

            const session = await axios.post('/api/payment', {email});

            // const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.data.id,
            });

            if (result.error) {
                console.log(result.error.message)
            }
        }  
    }

    const getCurrentCart = () => {
        axios.get('/api/cart').then(res => {
            setCart([...res.data]);
            props.getCart(res.data);
        })
    }

    const handleQuantityChange = (shirtID, quantity) => {
        axios.put(`/api/cart/${shirtID}`, { quantity }).then(() => {
            getCurrentCart();
        }).catch(err => console.log(err))
    }

    const removeItem = shirtID => {
        axios.delete(`/api/cart/${shirtID}`).then(() => {
            getCurrentCart()
        }).catch(err => console.log(err))
    }

    const subtotal = cart.reduce((acc, cur) => {
        return acc + (cur.quantity * cur.shirt.price)
    }, 0)

    const items = cart.map((item, i) => <CartItem key={i} item={item} handleQuantityChangeFn={handleQuantityChange} removeItemFn={removeItem}/>)

    return (
        <main>
            {cart.length === 0
                ? <section>
                    <p>Your cart is empty</p>
                    <Link to='/shirts' >Shop Our Products</Link>
                </section>
                : <section>
                    <hr />
                    {items}
                    <hr />
                    <p>${subtotal.toFixed(2)}</p>
                    <button id='checkout-button' roles='link' onClick={handleCheckout}>Checkout</button>
                </section>
            }
        </main>
    )

}

const mapStatetoProps = reduxState => {
    return {
        cartReducer: reduxState.cartReducer,
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStatetoProps, {getCart})(Cart);