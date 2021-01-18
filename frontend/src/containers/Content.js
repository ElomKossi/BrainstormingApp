import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { load_user } from '../actions/auth'
import CssBaseline from '@material-ui/core/CssBaseline';
import Topic from '../containers/Topic/Topic';

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

export default connect(mapStateToProps, { load_user })(Content);