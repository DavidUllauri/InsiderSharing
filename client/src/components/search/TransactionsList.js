import { Container, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import TransactionsContext from '../../context/transactions/transactionsContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
    },
    header: {
        fontSize: '50px',
    },
    attrLinks: {
        color: 'black',
        textDecoration: "none",
    },
}));

const TransactionsList = () => {
    const classes = useStyles();
    const { ticker, filing_id } = useParams();

    const transactionsContext = useContext(TransactionsContext);

    const { transactions, getTransactions, loading } = transactionsContext;

    useEffect(() => {
        getTransactions(ticker, filing_id);
        // eslint-disable-next-line
    }, []);

    if (transactions === null) {
        return (
            <Container>
                <Typography color="inherit" noWrap className={classes.toolbarTitle}>
                    No transactions for {filing_id} yet
                </Typography>
            </Container>
        )
    }

    return (
        <div>
            <Container maxWidth='lg'>
                <List>
                    <ListItem id={classes.header} className={classes.grid} divider={true}>
                        <Typography color="inherit" noWrap>
                            acquistion_or_disposition
                        </Typography>
                        <Typography color="inherit" noWrap>
                            transaction_date
                        </Typography>
                        <Typography color="inherit" noWrap>
                            transaction_type
                        </Typography>
                        <Typography color="inherit" noWrap>
                            num_securities_transacted
                        </Typography>
                        <Typography color="inherit" noWrap>
                            num_securities_owned
                        </Typography>
                        <Typography color="inherit" noWrap>
                            company_cik
                        </Typography>
                    </ListItem>
                    {transactions && transactions.map((transaction) => {
                        const {
                            acquistion_or_disposition,
                            transaction_date,
                            transaction_type,
                            num_securities_transacted,
                            num_securities_owned,
                            company_cik,
                            // filing_id,
                        } = transaction;

                        return (
                            <ListItem className={classes.grid} divider={true}>
                                <ListItemText>{acquistion_or_disposition}</ListItemText>
                                <ListItemText>{transaction_date}</ListItemText>
                                <ListItemText>{transaction_type}</ListItemText>
                                <ListItemText>{num_securities_transacted}</ListItemText>
                                <ListItemText>{num_securities_owned}</ListItemText>
                                <ListItemText>{company_cik}</ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
            </Container>
        </div>
    )
}

export default TransactionsList;
