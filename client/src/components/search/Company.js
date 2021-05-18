import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Company = () => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    return (
        <Container>
            <div className={classes.demo}>
                <List dense={dense}>
                    <ListItem id={classes.header} className={classes.grid} divider={true} button={true}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Ticker
                        </Typography>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Company Name
                        </Typography>
                    </ListItem>
                    {generate(
                        <ListItem className={classes.grid} divider={true} button={true}>
                            <ListItemText
                                primary="Ticker"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemText
                                primary="Company name"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                        </ListItem>,
                    )}
                </List>
            </div>
        </Container>
    )
}

export default Company
