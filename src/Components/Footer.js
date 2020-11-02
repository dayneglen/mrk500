import React, { useState } from 'react';
import axios from 'axios';

const Footer = props => {
    const [email, setEmail] = useState(''),
        [emailAdded, setEmailAdded] = useState(false);

    const handleEmailSubmit = async() => {

        try {
            const addEmail = await axios.post('/api/newsletter/email', { email });
            const sendWelcome = await axios.post('api/newsletter/welcome', {email});
            setEmailAdded(true);
            setEmail('');
            setTimeout(() => {
                setEmailAdded(false);
            }, 3000);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <footer>
            <section className='footer-wrapper'>
                <section className='social'>
                    <h1>Social</h1>
                    <a href='https://www.facebook.com/Mrk500-566610750527727/'>
                        <img src='https://tighestimepieces.com/wp-content/uploads/2016/11/Facebook-icon-WHITE.png' alt='Facebook Logo' />
                    </a>
                    <a href='https://www.instagram.com/mrk500_apparel/'>
                        <img src='https://tighestimepieces.com/wp-content/uploads/2016/11/Instagram-icon-WHITE.png' alt='Instagram Logo' />
                    </a>
                </section>
                <section className='email-newsletter'>
                    <h1>Newsletter</h1>
                    {emailAdded
                        ? <p>Thank you for subscribing!</p>
                        : <p>Subscribe to receive updates, access to deals, and more.</p>}
                    <input type='email' value={email} placeholder='Enter your email address' onChange={e => setEmail(e.target.value)} />
                    <button className='btn blue-green-btn' onClick={handleEmailSubmit}>SUBSCRIBE</button>
                </section>
            </section>
        </footer>
    )
}

export default Footer;