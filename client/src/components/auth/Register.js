import { Container, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = props => {
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        /* If this type of error happened a lot in this application, we should
        probably have an id that is sent from the backend for this type of error */
        if (error === 'User already exists') {
            console.error('User already exists');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { first_name, last_name, email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (first_name === '' || last_name === '' || email === '' || password === '') {
            console.error('Fields empty');
        } else {
            register({
                email,
                password,
                last_name,
                first_name
            });
        }
    };

    const classes = useStyles();

    return (
        <Container maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography>
                    Register
                </Typography>
                <form className={classes.form} onSubmit={onSubmit} validate='true'>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        onChange={onChange}
                        autoComplete="given-name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        onChange={onChange}
                        autoComplete="family-name"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={onChange}
                        autoComplete="email"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={onChange}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Register
