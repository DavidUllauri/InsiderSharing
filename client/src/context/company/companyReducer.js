import {
    GET_COMPANIES,
    CLEAR_CURRENT,
    COMPANY_ERROR
} from '../types';

const companyReducer = (state, action) => {
    switch (action.type) {
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload,
                loading: false
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case COMPANY_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default companyReducer;