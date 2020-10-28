import React, {useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';
import CustomerOrder from './CustomerOrder';


const Account = props => {
    useEffect(() => {
        if (!props.userReducer.user.email) {
            props.history.push('/');
        }
    }, []);


    const handleLogout = () => {
        axios.get('/auth/logout').then(_ => {
            props.getUser({})
            props.history.push('/');
        }).catch(err => console.log(err))
    }


    const orders = props.orderReducer.orders.map((order, i) => {
        axios.get(`/api/order/${order.order_id}`).then(res => {
            console.log('hit')
            return <CustomerOrder key={i} order={res.data} />
        }).catch(err => console.log(err));
        console.log('hittt')
        return null;
    })

    return (
        <main>
            <button onClick={handleLogout}>Logout</button>
            {orders}
        </main>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,
        orderReducer: reduxState.orderReducer
    }
}

export default connect(mapStateToProps, {getUser})(Account);

