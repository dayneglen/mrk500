import React, {useState} from 'react';
import axios from 'axios';

const Contact = props => {
    const [emailInputs, setEmailInput] = useState({
        email: '',
        name: '',
        message: ''
    }) 

    const handleEmailChange = e => {
        const { name, value } = e.target;
        setEmailInput({ ...emailInputs, [name]: value })
    }

    const sendContactEmail = () => {
        axios.post('/api/email', { name: emailInputs.name, email: emailInputs.email, message: emailInputs.message }).then(_ => {
            setEmailInput({email: '', name: '', message: '' })
            alert('Email Sent!')
        }).catch(err => console.log(err))
    }

    return (
        <section className='contact-us-container'>
            <section className='contact-us'>
                <h1>Contact Us</h1>
                <input value={emailInputs.name} name='name' placeholder='Your name' onChange={e => handleEmailChange(e)} />
                <input value={emailInputs.email} name='email' placeholder='Your email' onChange={e => handleEmailChange(e)} />
                <textarea value={emailInputs.message} name='message' placeholder='Your message' onChange={e => handleEmailChange(e)} />
                <button className='btn blue-green-btn' onClick={sendContactEmail}>Send Email</button>
            </section>
        </section>
    )
}

export default Contact;