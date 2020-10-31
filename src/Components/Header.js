import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';
import axios from 'axios';


const Header = props => {
    const [cartQuantity, setQuantity] = useState(0),
          [menu, setMenu] = useState(false);

    useEffect(() => {
        setQuantity(props.cartReducer.cart.length)
        axios.get('/auth/user').then(res => {
            props.getUser(res.data)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setQuantity(props.cartReducer.cart.length)
    }, [props.cartReducer.cart]);

    useEffect(() => {
        setMenu(false);
    }, [props.location.pathname])

    return (
        <header>
            <Link to='/' >
                <img className='logo' src='https://mrk500.s3-us-west-1.amazonaws.com/Logo.png' alt='Mrk500 Logo' />
            </Link>
            <div className='navbar-icon' onClick={() => setMenu(!menu)}>&#9776;</div>
            <nav className='navbar-menu'>
                {props.userReducer.user.email
                    ? props.userReducer.user.is_admin
                        ? <Link to='/admin/dashboard'>Dashboard</Link>
                        : <Link to='/account'>Account</Link>
                    : <Link to='/login'>Login</Link>}
                <Link to='/shirts'>Products</Link>
                

                <Link className='cart-container-header' to='/cart'>
                    Cart
                    <img className='cart-img' src='http://www.clker.com/cliparts/U/D/n/G/6/h/white-shopping-cart-md.png' alt='cart' />
                    {cartQuantity === 0
                        ? null
                        : <span className='cart-quantity'>{cartQuantity}</span>}
                    </Link>
                
            </nav>

            {/* SLide Out Menu */}
            <div className={menu ? 'menu slide' : 'menu'}>
                <hr/>
                {props.userReducer.user.email
                    ? props.userReducer.user.is_admin
                        ? <Link to='/admin/dashboard'>Dashboard</Link>
                        : <Link to='/account'>Account</Link>
                    : <Link to='/login'>Login</Link>}
                <hr/>
                <Link to='/shirts'>Products</Link>
                <hr/>
                {cartQuantity === 0
                    ? null
                    : <span className='cart-quantity'>{cartQuantity}</span>}
                <Link to='/cart'>Cart</Link>
                <hr />
            </div>

        </header>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,
        cartReducer: reduxState.cartReducer
    }
}

export default withRouter(connect(mapStateToProps, { getUser })(Header));