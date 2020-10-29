import React from 'react';

const OrderInfo = props => {

    const { img_url, name, price, size, tall, quantity } = props.product;

    const shirtStyle = {
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (
        <section className='order-shirt-info'>
            <div style={shirtStyle}></div>
            <h1>{name}</h1>
            <h2>Quantity: {quantity}</h2>
            <h2>${price}</h2>
            <h2>{size}</h2>
            <h2>{tall ? 'Tall' : 'Regular'}</h2>
        </section>
    )
}

export default OrderInfo;