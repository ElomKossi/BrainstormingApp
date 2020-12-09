import React from 'react';
import { connect } from 'react-redux';
import { load_user } from '../actions/auth'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topic from '../containers/Topic/Topic';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const Content = ({ load_user }) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.root}>
                <Topic />
            </div>
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