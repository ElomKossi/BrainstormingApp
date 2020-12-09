import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
        alignItems: 'center',
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const Header = ({ auth, logout, isAuthenticated }) => {
    const classes = useStyles();

    const { user } = auth;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const authLinks = (
        <Fragment>
                <Grid justify="space-between" container >
                    <Grid item>
                        <Button edge="start" >
                            <Link to='/' color="inherit" style={{ textDecoration: 'none' }}>
                                <Typography
                                component="h2"
                                variant="h5"
                                color="inherit"
                                align="center"
                                noWrap
                                className={classes.toolbarTitle}>
                                    BRAINSTORMING
                                </Typography>
                            </Link>
                        </Button>
                    </Grid>
                    <Grid item>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                            <Typography variant="h6" className={classes.title}>
                                {user ? `${user.username}` : ''}
                            </Typography>
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'top',horizontal: 'right',}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'right',}}
                            open={open}
                            onClose={handleClose}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Button >
                <Link size="small" to='/login' variant="body2" style={{ textDecoration: 'none' }}>
                    Subscribe
                </Link>
            </Button>
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}>
                BRAINSTORMING
            </Typography>
            <Button>
                <Link variant="body2" size="small" to='/signup' style={{ textDecoration: 'none' }}>
                    Sign up
                </Link>
            </Button>
        </Fragment>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
    //userData: state.auth.user
});

export default connect(mapStateToProps, { logout })(Header);