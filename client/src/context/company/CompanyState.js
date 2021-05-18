import React, { useReducer } from 'react';
import api from '../../utils/api'
import CompanyContext from './companyContext';
import companyReducer from './companyReducer';
import {
    GET_COMPANIES,
    COMPANY_ERROR,
    CLEAR_CURRENT
} from '../types';

const CompanyState = props => {
    const initialState = {
        companies: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(companyReducer, initialState);

    // Get Companies
    const getCompanies = async (company) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await api.post('/search', company, config);

            dispatch({
                type: GET_COMPANIES,
                payload: res.data.data.companies
            })
        } catch (err) {
            dispatch({
                type: COMPANY_ERROR,
                payload: err.response.msg
            });
        }
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    return (
        <CompanyContext.Provider
            value={{
                companies: state.companies,
                current: state.current,
                error: state.error,
                getCompanies,
                clearCurrent
            }}
        >
            {props.children}
        </CompanyContext.Provider>
    )
};

export default CompanyState;