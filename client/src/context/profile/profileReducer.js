import {
    GET_FOLLOWING,
    GET_USER_COMPANIES,
    GET_USER_OWNERS,
    ADD_USER_COMPANIES,
    ADD_USER_OWNERS,
    CLEAR_CURRENT,
    USER_ERROR
} from '../types';

const profileReducer = (state, action) => {
    switch (action.type) {
        case GET_FOLLOWING:
            return {
                ...state,
                user_following: action.payload,
                user_companies: action.payload.companies,
                user_owners: action.payload.owners,
                loading: false
            };
        case GET_USER_COMPANIES:
            return {
                ...state,
                user_companies: action.payload,
                loading: false
            };
        case GET_USER_OWNERS:
            return {
                ...state,
                user_owners: action.payload,
                loading: false
            };
        case ADD_USER_OWNERS:
            return {
                ...state,
                user_owners: action.payload,
                loading: false
            };
        case ADD_USER_COMPANIES:
            return {
                ...state,
                user_companies: action.payload,
                loading: false
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default profileReducer;