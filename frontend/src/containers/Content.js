import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { load_user } from '../actions/auth'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topic from '../containers/Topic/Topic';
import Thread from '../containers/Thread/Thread';

const Content = ({ load_user }) => {

    return (
        <Fragment>
            <CssBaseline/>
            <Topic />
        </Fragment>
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