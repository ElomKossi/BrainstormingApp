import React, { useEffect, Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
}));

const Layout = (props) => {
    // eslint-disable-next-line
    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await props.checkAuthenticated();
                await props.load_user();
            } catch (err) {

            }
        }

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <CssBaseline />
            <Header />
            {props.children}
            <Footer />
        </Fragment>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);