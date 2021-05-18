import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
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

const Search = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <Box m={1}>
                <Container maxWidth="md" className={classes.mt}>
                    <form className={classes.searchForm} noValidate autoComplete="off">
                        <TextField className={classes.searchField} label="Ticker" variant="outlined" />
                        <Button href="#" color="primary" variant="outlined">
                            <SearchIcon />
                        </Button>
                    </form>
                </Container>
            </Box>
        </Fragment>
    )
}

export default Search
