import React, { useReducer } from 'react';
import api from '../../utils/api';
import OwnerContext from './ownerContext';
import ownerReducer from './ownerReducer';
import {
    GET_OWNERS,
    CLEAR_CURRENT,
    OWNER_ERROR
} from '../types';

const OwnerState = props => {
    const initialState = {
        owners: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(ownerReducer, initialState);

    // Get Owners
    const getOwners = async ticker => {
        try {
            const res = await api.get(`/search/${ticker}`);

            dispatch({
                type: GET_OWNERS,
                payload: res.data.data.owners
            });
        } catch (err) {
            dispatch({
                type: OWNER_ERROR,
                payload: err.response.msg
            });
        }
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    return (
        <OwnerContext.Provider
            value={{
                owners: state.owners,
                current: state.current,
                error: state.error,
                getOwners,
                clearCurrent
            }}
        >
            {props.children}
        </OwnerContext.Provider>
    )
};

export default OwnerState;