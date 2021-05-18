import React, { useReducer } from 'react';
import api from '../../utils/api';
import TransactionsContext from './transactionsContext';
import transactionsReducer from './transactionsReducer';
import {
    GET_TRANSACTIONS,
    CLEAR_CURRENT,
    TRANSACTIONS_ERROR
} from '../types';

const TransactionsState = props => {
    const initialState = {
        transactions: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(transactionsReducer, initialState);

    const getTransactions = async (ticker, filing_id) => {
        try {
            const res = await api.get(`/search/${ticker}/${filing_id}`);

            dispatch({
                type: GET_TRANSACTIONS,
                payload: res.data.data.transactions
            });
        } catch (err) {
            dispatch({
                type: TRANSACTIONS_ERROR,
                payload: err.response.msg
            });
        }
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    return (
        <TransactionsContext.Provider
            value={{
                transactions: state.transactions,
                current: state.current,
                error: state.error,
                getTransactions,
                clearCurrent
            }}
        >
            {props.children}
        </TransactionsContext.Provider>
    )
};

export default TransactionsState;