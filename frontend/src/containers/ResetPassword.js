import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

const ResetPassword = (props) => {
    const classes = useStyles();

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        props.reset_password(email);
        setRequestSent(true);
    };

    if (requestSent)
        return <Redirect to='/' />
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Request Password Reset:
                </Typography>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Your Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => onChange(e)}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Reset Password
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default connect(null, { reset_password })(ResetPassword);

// eslint-disable-next-line
{/* <form onSubmit={e => onSubmit(e)}>
<div className='form-group'>
    <input
        className='form-control'
        type='email'
        placeholder='Your Email'
        name='email'
        value={email}
        onChange={e => onChange(e)}
        required
    />
</div>
<button className='btn btn-primary' type='submit'>Reset Password</button>
</form> */}