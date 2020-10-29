import React from 'react';
import { Link } from 'react-router-dom';

const CustomerOrder = props => {
    const total = Number(props.order.total);
    
    return (
        <Link to={`/account/order/${props.order.order_id}`} className='customer-order'>
              <h1>Order Number: {props.order.order_id}</h1>
              <h2>Order Total: {total.toFixed(2)}</h2>
        </Link>
    )
}


export default CustomerOrder;