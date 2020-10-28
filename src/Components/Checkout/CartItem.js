import React from 'react';

const CartItem = props => {
    const { img_url, name, price, size, tall, shirt_id } = props.item.shirt,
        { quantity } = props.item;

    const shirtStyle = {
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <section className='cart-item'>
            <div className='shirt' style={shirtStyle}></div>
            <section className='cart-product-info'>
                <section className='cart-info-container'>
                    <section className='cart-info'>
                        <h4>{name}</h4>
                        <p>{size} {tall ? 'Tall' : 'Regular'}</p>
                        <p>${price}</p>
                    </section>
                    
                    <section className='quantity-container'>
                        <section className='quantity-row'>
                            <button className='minus' onClick={() => props.handleQuantityChangeFn(shirt_id, -1)}>-</button>
                            <p className='quantity'>{quantity}</p>
                            <button className='plus' onClick={() => props.handleQuantityChangeFn(shirt_id, 1)}>+</button>
                        </section>
                        <section>
                            <p className='remove' onClick={() => props.removeItemFn(shirt_id)}>Remove</p>
                        </section>
                </section>
                </section>
                <h2>${quantity * price}</h2>
            </section>
            

        </section>
    )
}

export default CartItem;