import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Activate = (props) => {
    const classes = useStyles();

    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.verify(uid, token);
        setVerified(true);
    };

    if (verified)
        return <Redirect to='/' />
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop: '200px' }}>
                <Typography component="h1" variant="h5">
                    Verify your Account:
                </Typography>
                <Button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary">
                    Verify
                </Button>
            </div>
        </Container>
    );
};

export default connect(null, { verify })(Activate);