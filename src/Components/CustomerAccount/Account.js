import React, {useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';
import { getOrders } from '../../redux/orderReducer';
import CustomerOrder from './CustomerOrder';


const Account = props => {
    useEffect(() => {
        if (!props.userReducer.user.email) {
            props.history.push('/');
        }
        
    }, []);

    useEffect(() => {
        axios.get(`/api/orders/${props.userReducer.user.user_id}`).then(res => {
            props.getOrders(res.data);
        }).catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('/auth/logout').then(_ => {
            props.getUser({})
            props.history.push('/');
        }).catch(err => console.log(err))
    }


    const orders = props.orderReducer.orders.map((order, i) => {
        return (
              <CustomerOrder order={order} key={i} />
        )
    })

    const {first_name, last_name, email} = props.userReducer.user;

    return (
        <main className='account-container'>
            <button className='btn blue-green-btn'onClick={handleLogout}>Logout</button>
            <section className='account-details'>
                <h1>Account Details</h1>
                <h2>{first_name} {last_name}</h2>
                <h2>{email}</h2>
            </section>
            <section className='order-container'>
                {orders}
            </section>
            
        </main>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,
        orderReducer: reduxState.orderReducer
    }
}

export default connect(mapStateToProps, {getUser, getOrders})(Account);

