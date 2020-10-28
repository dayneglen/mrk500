import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const CustomerOrder = props => {
    
    useEffect(() => {
        axios.post(`/api/order/${props.userReducer.user.user_id}`)
    }, [])

    console.log(props)
    return (
        <section>

        </section>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps)(CustomerOrder);