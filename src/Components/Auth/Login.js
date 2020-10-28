import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';
import { getOrders } from '../../redux/orderReducer';
import axios from 'axios';

const Login = props => {
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        axios.post('/auth/login', {email, password}).then(res => {
            props.getUser(res.data);
            axios.get(`/api/orders/${res.data.user_id}`).then(res => {
                props.getOrders(res.data);
            }).catch(err => console.log(err));
            props.history.push('/');
        })
        .catch(_ => alert('Incorrect Password or Email'))
    }
   
    return (
        <section className='login-container'>
            <form className='login-register'>
                <h1>Login</h1>
                <input placeholder='Email' value={email} type='text' id='email' onChange={e => setEmail(e.target.value)}></input>
                <input placeholder='Password' value={password} type='password' id='password' onChange={e => setPassword(e.target.value)}></input>
                <button className='btn dark-grey-btn'  onClick={handleLogin}>Login</button>
                <p>Don't have an account? <em><Link to='/register'>Create one</Link></em></p>
            </form>
        </section>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps, {getUser, getOrders})(Login);