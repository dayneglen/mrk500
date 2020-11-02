import React from 'react';

const SubscriberEmail = props => {
    const {email, newsletter_email_id} = props.subscriberEmail;

    return (
        <section className='subscriber-email'>
            <h1>{email}</h1>
            <button className='btn dark-grey-btn' onClick={() => props.deleteEmailFn(newsletter_email_id)}>Delete Email</button>
        </section>
    )   
}

export default SubscriberEmail;