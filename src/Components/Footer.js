import React, { useState } from 'react';
import axios from 'axios';

const Footer = props => {
    const [email, setEmail] = useState(''),
        [emailAdded, setEmailAdded] = useState(false);

    const handleEmailSubmit = () => {
        axios.post('/api/newsletter/email', { email }).then(_ => {
            setEmailAdded(true);
            setEmail('');
            setTimeout(() => {
                setEmailAdded(false);
            }, 3000);
        }).catch(_ => alert('Email Already Subscribed'));
    }

    return (
        <footer>
            <section className='social'>
                <h1>Social</h1>
                <a href='https://www.facebook.com/Mrk500-566610750527727/'>
                    <img src='../images/iconfinder_Circled_Facebook_svg_5279111.png' alt='Facebook Logo' />
                </a>
                <a href='https://www.instagram.com/mrk500_apparel/'>
                    <img src='../images/iconfinder_Circled_Instagram_svg_5279112.png' alt='Instagram Logo' />
                </a>
            </section>
            <section className='email-newsletter'>
                <h1>Newsletter</h1>
                {emailAdded
                    ? <p>Thank you for subscribing!</p>
                    : <p>Subscribe to receive updates, access to deals, and more.</p>}
                <input type='email' value={email} placeholder='Enter your email address' onChange={e => setEmail(e.target.value)} />
                <button classname='btn blue-green-btn' onClick={handleEmailSubmit}>SUBSCRIBE</button>
            </section>
        </footer>
    )
}

export default Footer;