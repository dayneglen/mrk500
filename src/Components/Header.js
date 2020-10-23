import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';
import axios from 'axios';


const Header = props => {
    const [cartQuantity, setQuantity] = useState(0);

    useEffect(() => {
        axios.get('/auth/user').then(res => {
            props.getUser(res.data)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setQuantity(props.cartReducer.cart.length)
    }, [props.cartReducer.cart])


    return (
        <header>
            <nav>
                {props.userReducer.user.is_admin
                    ? <Link to='/add'>Add Product</Link>
                    : null}
                {props.userReducer.user.email
                    ? props.userReducer.user.is_admin
                        ? <Link to='/admin/dashboard'>Dashboard</Link>
                        : <Link to='/account'>Account</Link>
                    : <Link to='/login'>Login</Link>}
                <Link to='/shirts'>Products</Link>
                {cartQuantity === 0
                    ? null
                    : <span>{cartQuantity}</span>}

                <Link to='/cart'>Cart</Link>
            </nav>

        </header>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,
        cartReducer: reduxState.cartReducer
    }
}

export default connect(mapStateToProps, { getUser })(Header);