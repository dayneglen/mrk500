import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer
});

export default createStore(rootReducer);