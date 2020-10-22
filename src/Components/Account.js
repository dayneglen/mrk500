import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';


const Account = props => {
    const handleLogout = () => {
        axios.get('/auth/logout').then(_ => {
            props.getUser({})
            props.history.push('/');
        }).catch(err => console.log(err))
    }

    return (
        <main>
            <button onClick={handleLogout}>Logout</button>
            
        </main>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps, {getUser})(Account);

