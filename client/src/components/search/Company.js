import React, { useContext } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import CompanyContext from '../../context/company/companyContext';
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
        gridTemplateColumns: "1fr 3fr",
    },
    header: {
        fontSize: '50px',
    },
    attrLinks: {
        color: 'black',
        textDecoration: "none",
    },
}));

const Company = () => {
    const classes = useStyles();
    const companyContext = useContext(CompanyContext);

    const { companies, loading } = companyContext;

    if (companies === null && !loading) {
        return (
            <Container>
                <Typography color="inherit" noWrap className={classes.toolbarTitle}>
                    Search for company
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <div className={classes.demo}>
                <List>
                    <ListItem id={classes.header} className={classes.grid} divider={true} button={true}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Ticker
                        </Typography>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Company Name
                        </Typography>
                    </ListItem>
                    {companies && companies.map((company) => {
                        return (
                            <Link className={classes.attrLinks} to={company.ticker && company.ticker} key={company.ticker}>
                                <ListItem className={classes.grid} divider={true} button={true}>
                                    <ListItemText
                                        primary={company.ticker}
                                    />
                                    <ListItemText
                                        primary={company.company_name}
                                    />
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </div>
        </Container>
    )
}

export default Company
