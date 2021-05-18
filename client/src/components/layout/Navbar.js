import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import { Link } from 'react-router-dom';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
}));

const Navbar = () => {
    const classes = useStyles();

    // const authLinks = (
    //     <Fragment>
    //         <AccountCircleIcon />
    //     </Fragment>
    // )

    const guestLinks = (
        <Fragment>
            <Button href="#" color="primary" variant="outlined" className={classes.link}>
                Register
            </Button>
            <Button href="#" color="primary" variant="outlined" className={classes.link}>
                Login
            </Button>
        </Fragment>
    )

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    🚀 Boss Trades
                </Typography>
                <nav>
                    {guestLinks}
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
