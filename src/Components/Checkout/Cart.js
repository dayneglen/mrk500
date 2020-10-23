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
    //stripe info

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    const handleClick = async (event) => {
        const stripe = await stripePromise;

        const session = await axios.post('/api/payment');

        // const session = await response.json();

        console.log(session)

        const result = await stripe.redirectToCheckout({
            sessionId: session.data.id,
        });

        if (result.error) {
            console.log(result.error.message)
        }
    }
    const [cart, setCart] = useState([]);
    

    useEffect(() => {
        getCurrentCart();
    }, [])

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

    const checkUser = () => {
        if(props.userReducer.user.email) {
            props.history.push('/checkout')
        } else {
            alert('Please login to finish checkout');
            props.history.push('/login')
        }
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
                    <button id='checkout-button' roles='link' onClick={handleClick}>Checkout</button>
                    {message}
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