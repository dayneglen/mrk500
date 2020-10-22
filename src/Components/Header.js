import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';
import axios from 'axios';


const Header = props => {
    
    useEffect(() => {
        axios.get('/auth/user').then(res => {
            props.getUser(res.data)
        }).catch(err => console.log(err))
    }, [])
   
    return (
        <header>
            <nav>
                {props.userReducer.user.is_admin 
                ? <Link to='/add'>Add Product</Link>
                :null}
                {props.userReducer.user.email
                ? props.userReducer.user.is_admin 
                    ? <Link to='/admin/dashboard'>Dashboard</Link>
                    : <Link to='/account'>Account</Link>
                : <Link to='/login'>Login</Link>}
                <Link to='/shirts'>Products</Link>
            </nav>
            
        </header>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps, {getUser})(Header);