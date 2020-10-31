import React, { useState } from 'react';
import axios from 'axios';

const Contact = props => {
    const [emailInputs, setEmailInput] = useState({
        email: '',
        name: '',
        message: '',
        sent: false
    })

    const handleEmailChange = e => {
        const { name, value } = e.target;
        setEmailInput({ ...emailInputs, [name]: value })
    }

    const sendContactEmail = () => {
        axios.post('/api/email', { name: emailInputs.name, email: emailInputs.email, message: emailInputs.message }).then(_ => {
            setEmailInput({ email: '', name: '', message: '', sent: true });
            setTimeout(() => {
                setEmailInput({sent: false});
            }, 3000)
        }).catch(err => console.log(err))
    }


    return (
        <section className='contact-us-container'>
            <section className='contact-us'>
                <h1>Contact Us</h1>
                {emailInputs.sent
                    ? <section className='sent-message'>
                        <p>We've received your message!</p>
                        <p>You should hear back from us within 24 hours.</p>
                    </section>
                    : null
                }
                <input value={emailInputs.name} name='name' placeholder='Your name' onChange={e => handleEmailChange(e)} />
                <input value={emailInputs.email} name='email' placeholder='Your email' onChange={e => handleEmailChange(e)} />
                <textarea value={emailInputs.message} name='message' placeholder='Your message' onChange={e => handleEmailChange(e)} />
                <button className='btn blue-green-btn' onClick={sendContactEmail}>Send Email</button>
            </section>
        </section>
    )
}

export default Contact;