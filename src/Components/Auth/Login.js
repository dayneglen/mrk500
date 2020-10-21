import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';
import axios from 'axios';

const Login = props => {
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        axios.post('/auth/login', {email, password}).then(res => {
            props.getUser(res.data);
            props.history.push('/');
        })
        .catch(_ => alert('Incorrect Password or Email'))
    }
   
    return (
        <form>
            <h1>Login</h1>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' onChange={e => setEmail(e.target.value)}></input>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' onChange={e => setPassword(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to='/register'>Create one</Link></p>
        </form>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps, {getUser})(Login);