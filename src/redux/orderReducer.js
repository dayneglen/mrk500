const initialState = {
    orders: []
}

const GET_ORDER = 'GET_ORDER';

export function getOrders(orders) {
    return {
        type: GET_ORDER,
        payload: orders
    }
}

export default function orderReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ORDER:
            return { ...state, orders: payload };
        default:
            return state;
    }
}
