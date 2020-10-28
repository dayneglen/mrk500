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
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCurrentCart();
    }, [])
    
    // Function to handle checkout and send message for stripe payment
    const handleCheckout = async () => {
        const {email, user_id} = props.userReducer.user;

        const cart = await axios.get('/api/cart');
        axios.post(`/api/order/${user_id}`, {total}).then().catch(err => console.log(err))

        if (!email) {
            alert('Please login to finish checkout');
            props.history.push('/login')
        } else {
            const stripe = await stripePromise;

            const session = await axios.post('/api/payment', {cart: cart.data});

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

    const taxTotal = subtotal * 0.0725;

    const total = taxTotal + subtotal;

    const items = cart.map((item, i) => <CartItem key={i} item={item} handleQuantityChangeFn={handleQuantityChange} removeItemFn={removeItem}/>)

    return (
        <main>
            {props.cartReducer.cart.length === 0
                ? <section className='empty-cart'>
                    <p>Your cart is empty</p>
                    <Link to='/shirts' >Shop Our Products</Link>
                </section>
                : <section className='cart-container'>
                    <section className='cart'>
                        <hr />
                        {items}
                        <hr />
                    </section>
                    
                    <section className='checkout'>
                        <h2>ORDER SUMMARY</h2>
                        <section className='order-summary'> 
                            <h6>Subtotal</h6>
                            <p>${subtotal.toFixed(2)}</p>
                        </section>
                        <section className='order-summary'>
                            <h6>Estimated Shipping</h6>
                            <p>Free</p>
                        </section>
                        <section className='order-summary'>
                            <h6>Estimated Tax</h6>
                            <p>{taxTotal.toFixed(2)}</p>
                        </section>
                        <section className='order-summary'>
                            <h6>Order Total</h6>
                            <p>{total.toFixed(2)}</p>
                        </section>
                        <button className='btn blue-green-btn' id='checkout-button' roles='link' onClick={handleCheckout}>Checkout</button>
                    </section>
                   
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