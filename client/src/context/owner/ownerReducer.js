import {
    GET_OWNERS,
    CLEAR_CURRENT,
    OWNER_ERROR
} from '../types';

const ownerReducer = (state, action) => {
    switch (action.type) {
        case GET_OWNERS:
            return {
                ...state,
                owners: action.payload,
                loading: false
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case OWNER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default ownerReducer;