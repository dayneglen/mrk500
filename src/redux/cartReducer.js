const initialState = {
    cart: []
}

export default function userReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
        default:
            return state;
    }
}