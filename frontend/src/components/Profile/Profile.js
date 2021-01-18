import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateProfile, updatePassword } from '../../actions/profile';
import { authHeader } from '../../utils/config';
import { load_user } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  const {
    username,
    first_name,
    last_name,
    email,
    topics,
    threads,
    ideas,
    error,
  } = props;

  const [formData, setFormData] = useState({
    new_first_name: first_name,
    new_last_name: last_name,
    new_email: email,
    new_username: username,
    new_password: '',
    re_new_password: '',
    current_password: '',
  });

  const {
    new_first_name,
    new_last_name,
    new_email,
    new_username,
    new_password,
    re_new_password,
    current_password,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    props.updateProfile(first_name, last_name, email, username);
    props.updatePassword(new_password, re_new_password, current_password);
  };

  const userInfo = (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <Card className={classes.root}>
          <CardHeader title='User Information' />
          <CardContent>
            <div className={classes.paper}>
              <form
                className={classes.form}
                onSubmit={(e) => onSubmit(e)}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete='first_name'
                      name='first_name'
                      variant='outlined'
                      required
                      fullWidth
                      id='first_name'
                      label='First Name'
                      autoFocus
                      value={first_name}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='last_name'
                      label='Last Name'
                      name='last_name'
                      autoComplete='last_name'
                      value={last_name}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='username'
                      label='Username'
                      name='username'
                      autoComplete='username'
                      value={username}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}>
                            CHANGE USER INFORMATION
                        </Button>
                    </Grid>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className={classes.root}>
          <CardHeader title='Password' />
          <CardContent>
            <div className={classes.paper}>
                <form
                    className={classes.form}
                    onSubmit={(e) => onSubmit(e)}
                    noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            name='current_password'
                            label='Current password'
                            type='password'
                            id='current_password'
                            autoComplete='current-password'
                            value={current_password}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            name='new_password'
                            label='New Password'
                            type='new_password'
                            id='new_password'
                            autoComplete='current-password'
                            value={new_password}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            name='re_password'
                            label='Confirm Password'
                            type='password'
                            id='re_password'
                            autoComplete='current-password'
                            value={re_new_password}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}>
                                CHANGE THE PASSWORD
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  );

  const actionsList = (
    <Fragment>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>Topics {topics.length}</Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>Threads {threads.length}</Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>Ideas {ideas.length}</Paper>
      </Grid>
    </Fragment>
  );

  return (
    <div>
        <CssBaseline />
        <div className={classes.paper}>
            <Grid container spacing={3}>
                {actionsList}
            </Grid>
            <Grid container spacing={3}>
                {userInfo}
            </Grid>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  load_user: () => {
    dispatch(load_user());
  },
  updateProfile: (first_name, last_name, email) => {
    dispatch(load_user(first_name, last_name, email));
  },
  updatePassword: (new_password, re_new_password, current_password) => {
    dispatch(load_user(new_password, re_new_password, current_password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
