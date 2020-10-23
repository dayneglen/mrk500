import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Auth/Login';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { getCart } from '../../redux/cartReducer';
import axios from 'axios';


const Cart = props => {
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
                    <h4 onClick={checkUser} >Checkout</h4>
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