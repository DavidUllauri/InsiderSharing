import React, { useReducer } from 'react';
import api from '../../utils/api';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import {
    GET_FOLLOWING,
    GET_USER_COMPANIES,
    GET_USER_OWNERS,
    ADD_USER_COMPANIES,
    ADD_USER_OWNERS,
    CLEAR_CURRENT,
    USER_ERROR
} from '../types';
import Profile from '../../components/profile/Profile';

const ProfileState = props => {
    const initialState = {
        user_following: null,
        user_companies: null,
        user_owners: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(profileReducer, initialState);

    // Get Owners
    const getFollowing = async () => {
        try {
            const res = await api.get('/following');

            dispatch({
                type: GET_FOLLOWING,
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    }

    const addCompany = async ticker => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await api.post('/following/companies', { ticker }, config);

            dispatch({
                type: ADD_USER_COMPANIES,
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    }

    const addOwner = async filing_id => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await api.post('/following/owners', { filing_id }, config);

            dispatch({
                type: ADD_USER_OWNERS,
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    }

    return (
        <ProfileContext.Provider
            value={{
                user_following: state.user_following,
                user_companies: state.user_companies,
                user_owners: state.user_owners,
                current: state.current,
                error: state.error,
                getFollowing,
                addCompany,
                addOwner
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    )
};

export default ProfileState;