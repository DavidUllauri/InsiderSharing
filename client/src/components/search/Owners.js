import React, { useContext, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import { Link, useParams } from 'react-router-dom';
import OwnerContext from '../../context/owner/ownerContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ProfileContext from '../../context/profile/profileContext';


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
        gridTemplateColumns: "1fr 3fr 1fr",
    },
    header: {
        fontSize: '50px',
    },
    attrLinks: {
        color: 'black',
        textDecoration: "none",
    },
}));

const Owners = () => {
    const classes = useStyles();
    const { ticker } = useParams();


    const ownerContext = useContext(OwnerContext);
    const profileContext = useContext(ProfileContext);

    const { owners, getOwners, loading } = ownerContext;
    const { addOwner } = profileContext;

    useEffect(() => {
        getOwners(ticker);
        // eslint-disable-next-line
    }, [])

    if (owners === null && !loading) {
        return (
            <Container>
                <Typography color="inherit" noWrap className={classes.toolbarTitle}>
                    No owner yet for {ticker}
                </Typography>
            </Container>
        );
    }

    const onFollow = (e, filing) => {
        e.preventDefault();
        addOwner(filing);
    }

    return (
        <Container>
            <div className={classes.demo}>
                <List>
                    <ListItem id={classes.header} className={classes.grid} divider={true} button={true}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Filing no.
                        </Typography>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Owner Name
                        </Typography>
                    </ListItem>
                    {owners && owners.map((owner) => {
                        const link = ticker + '/' + owner.filings;
                        return (
                            <Link className={classes.attrLinks} to={link && link} key={owner.filings}>
                                <ListItem className={classes.grid} divider={true} button={true}>
                                    <ListItemText
                                        primary={owner.filings}
                                    />
                                    <ListItemText
                                        primary={owner.owner_name}
                                    />
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        className={classes.link}
                                        onClick={(e) => onFollow(e, owner.filings)}
                                    >
                                        Follow
                                    </Button>
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </div>
        </Container>
    );
};

export default Owners
