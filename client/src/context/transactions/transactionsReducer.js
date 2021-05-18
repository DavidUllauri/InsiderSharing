import {
    GET_TRANSACTIONS,
    CLEAR_CURRENT,
    TRANSACTIONS_ERROR
} from '../types';

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
                loading: false
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case TRANSACTIONS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default transactionsReducer;