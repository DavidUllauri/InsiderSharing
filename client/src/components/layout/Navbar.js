import React, { Fragment, useContext, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    attrLinks: {
        color: 'black',
        textDecoration: "none",
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout,
        // user, 
        loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
        // clearContacts();
    };

    const authLinks = (
        <Fragment>
            <Link className={classes.attrLinks} to='/profile'>
                <Button color="primary" variant="outlined" className={classes.link}>
                    <AccountCircleIcon />
                </Button>
            </Link>
            <Button color="primary" variant="outlined" className={classes.link} onClick={onLogout}>
                Logout
            </Button>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link className={classes.attrLinks} to='/register'>
                <Button color="primary" variant="outlined" className={classes.link}>
                    Register
            </Button>
            </Link>
            <Link className={classes.attrLinks} to='/login'>
                <Button color="primary" variant="outlined" className={classes.link}>
                    Login
                </Button>
            </Link>
        </Fragment>
    )

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    <Link className={classes.attrLinks} to='/'>
                        🚀 Boss Trades
                    </Link>
                </Typography>
                <nav>
                    {isAuthenticated ? authLinks : guestLinks}
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
