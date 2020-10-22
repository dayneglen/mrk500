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
        <form>
            <h1>Register</h1>
            { emailInUse 
            ? <p>Email is already in use. Please choose another</p>
            : null }
            <label htmlFor='firstName' >First Name</label>
            <input value={firstName}required='required' type='text' id='firstName' onChange={e => setFirstName(e.target.value)}></input>
            <label htmlFor='lastName' >Last Name</label>
            <input value={lastName} required type='text' id='lastName' onChange={e => setLastName(e.target.value)}></input>
            <label htmlFor='email'>Email</label>
            <input value={email} required type='text' id='email' onChange={e => setEmail(e.target.value)}></input>
            <label htmlFor='password'>Password</label>
            <input value={password}required type='password' id='password' onChange={e => setPassword(e.target.value)}></input>
            <button onClick={handleRegister}>Register</button>
        </form>
    )
}

export default Register;