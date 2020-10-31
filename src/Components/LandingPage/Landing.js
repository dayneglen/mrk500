import React from 'react';
import { Link } from 'react-router-dom';
import Contact from './Contact';
const Landing = props => {
    
    return (
        <div className='landing-body'>
            <section className='welcome-container'>
                <section className='welcome-message'>
                    <h1>Premium Shirts for not a Premium Price</h1>
                    <Link to='/shirts'>
                        <button className='btn blue-green-btn'>Shop Our Current Designs</button>
                    </Link>
                </section>
            </section>
            <section className='new-designs-container'>
                <h1>New Designs Added Monthly</h1>
            </section>
            <section className='shirt-facts-container'>
                <section className='shirt-facts'>
                    <h1>DOUBLE STICHED SEAMS</h1>
                    <h1>MORDERN, COMFORTABLE FIT</h1>
                    <h1>LIMITED EDITIONS</h1>
                    <h1>100% COTTON</h1>
                </section>
            </section>
            <section className='why-buy-container'>
                <section className='why-buy-wrapper'>
                    <h1>What Makes Our Shirts So Good?</h1>
                    <section className='why-buy-flex'>
                        <section className='why-buy'>
                            <div className='man-shirt-example'></div>
                            <h2>MORDERN FIT</h2>
                            <p>MRK500 shirts are made to comfortably fit most body shapes and sizes. Our fit is slim-ish, and a tad longer than other shirts to provide amazing comfort and confidence in your new look.</p>
                        </section>
                        <section className='why-buy'>
                            <div className='cotton-pic'></div>
                            <h2>COMBED AND RING-SPUN COTTON!</h2>
                            <p>MRK500 shirts are made from 100% combed and ring-spung cotton. MRK500 shirts feel soft and light, with just the right amount of stretch and the best durability. Cotton is the de-facto standard for giving structure and comfort to awesome shirts. MRK500 shirts have the perfect blend to give you the best possible shirt.</p>
                        </section>
                        <section className='why-buy'>
                            <div className='shirt-example'></div>
                            <h2>BEST QUALITY, BEST PRICE</h2>
                            <p>MRK500 t-shirts start and end at $15! We spent countless hours sourcing the best materials and figuring out the best overall fit to make the perfect shirt. MRK500 will be the best t-shirt in your closet, not just the best t-shirt under $20, the best t-shirt at any price!</p>
                        </section>
                    </section>
                </section>
            </section>
            <Contact /> 
        </div>
    )
}

export default Landing;