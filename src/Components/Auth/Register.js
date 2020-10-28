import React, { useState } from 'react';
import axios from 'axios';

const Register = props => {
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [emailInUse, setEmailInUse] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        axios.post('/auth/register', {firstName, lastName, email, password}).then(() => {
            props.history.push('/');
        }).catch(() => setEmailInUse(true));
    }

    return (
        <section className='login-container'>
            <form className='login-register'>
                <h1>Register</h1>
                {emailInUse
                    ? <p>Email is already in use. Please choose another</p>
                    : null}
                <input placeholder='First Name' value={firstName} required='required' type='text' id='firstName' onChange={e => setFirstName(e.target.value)}></input>
                <input placeholder='Last Name' value={lastName} required type='text' id='lastName' onChange={e => setLastName(e.target.value)}></input>
                <input placeholder='Email' value={email} required type='text' id='email' onChange={e => setEmail(e.target.value)}></input>
                <input placeholder='Password' value={password} required type='password' id='password' onChange={e => setPassword(e.target.value)}></input>
                <button className='btn dark-grey-btn' onClick={handleRegister}>Register</button>
            </form>
        </section>
        
    )
}

export default Register;