import React from 'react';
import { connect } from 'react-redux';
import { load_user } from '../actions/auth'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topic from '../containers/Topic/Topic';

const Content = ({ load_user }) => {

    return (
        <Container component="main" maxWidth="lg" fixed>
            <CssBaseline />
            <div>
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