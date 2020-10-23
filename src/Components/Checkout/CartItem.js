import React from 'react';

const CartItem = props => {
    const { img_url, name, price, size, tall, shirt_id } = props.item.shirt,
          { quantity } = props.item;
        
    return (
        <section>
            <img className="shirt" src={img_url} alt={name} />
            <section>
                <h4>{name}</h4>
                <p>{size} {tall ? 'Tall' : 'Regular' }</p>
                <>${price}</>
            </section>
            <section className='quantity-container'>
                <button onClick={() => props.handleQuantityChangeFn(shirt_id, -1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => props.handleQuantityChangeFn(shirt_id, 1)}>+</button>
                <p onClick={() => props.removeItemFn(shirt_id)}>Remove</p>
            </section>
            <h2>${quantity * price}</h2>
            
        </section>
    )
}

export default CartItem;