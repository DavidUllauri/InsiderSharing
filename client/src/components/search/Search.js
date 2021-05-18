import React, { Fragment, useState, useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CompanyContext from '../../context/company/companyContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    searchField: {
        width: "100%",
    },
    searchForm: {
        display: 'grid',
        gridTemplateColumns: '6fr 1fr',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    mt: {
        marginTop: '28px',
    },
}));

const Search = ({ label }) => {
    const classes = useStyles();
    const companyContext = useContext(CompanyContext);
    const [company, setCompany] = useState({
        ticker: ''
    });

    const { getCompanies, clearCurrent, current } = companyContext;

    useEffect(() => {
        if (current !== null) {
            setCompany(current);
        } else {
            setCompany({
                ticker: ''
            });
        }
    }, [current]);

    const onChange = e =>
        setCompany({ ...company, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        getCompanies(company);
        clearCurrent();
    }

    return (
        <Fragment>
            <Box m={1}>
                <Container maxWidth="md" className={classes.mt}>
                    <form className={classes.searchForm} noValidate autoComplete="off" onSubmit={onSubmit}>
                        <TextField
                            name='ticker'
                            className={classes.searchField}
                            label={label}
                            variant="outlined"
                            onChange={onChange}
                        />
                        <Button color="primary" variant="outlined" onClick={onSubmit}>
                            <SearchIcon />
                        </Button>
                    </form>
                </Container>
            </Box>
        </Fragment>
    )
}

Search.defaultProps = {
    label: 'Ticker'
}

export default Search
