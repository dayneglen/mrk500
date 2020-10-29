import React, { useState, useEffect } from 'react';
import OrderInfo from './OrderInfo';
import { connect } from 'react-redux';
import axios from 'axios';

const CustomerOrderPage = props => {

    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        axios.post(`/api/customer/order/${props.userReducer.user.user_id}`, { orderId: props.match.params.id }).then(res => {
            setOrderInfo([...res.data]);
        }).catch(err => console.log(err))
    }, []);

    
    const productInfo = orderInfo.map((product, i) => <OrderInfo key={i} product={product} />)

    return (
        <main className='order-info-container'>
            <button className='btn dark-grey-btn' onClick={() => props.history.goBack()} >Back To Orders</button>
            <h1 className='order-info-header'>Order Number: {props.match.params.id}</h1>
            <section className='order-info'>
                {productInfo}
            </section>

        </main>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps)(CustomerOrderPage);