import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { load_user } from '../actions/auth'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Content = ({ load_user }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    load_user()
    //console.log(userData)
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.user
});

// const mapDispatchToProps = dispatch => {
//     return {
//         load_user: () => dispatch(load_user())
//     }
// }

export default connect(mapStateToProps, { load_user })(Content);