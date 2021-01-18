import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const Header = ({ auth, logout, isAuthenticated }) => {
    const classes = useStyles();
    const history = useHistory();

    const { user } = auth;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const myDashboard = () => {
        setAnchorEl(null);
        history.push(`/dashboard/${user.username}`);
    };

    const renderLinkTopic = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={'/'} ref={ref} {...itemProps} />),
        ['/'],
    );

    const renderLinkLogin = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={'/login'} ref={ref} {...itemProps} />),
        ['/login'],
    );

    const renderLinkSignup = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={'/signup'} ref={ref} {...itemProps} />),
        ['/signup'],
    );

    const authLinks = (
        <Fragment>
                <Grid justify="space-between" container >
                    <Grid item>
                        <Button edge="start" component={renderLinkTopic}>
                            <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}>
                                BRAINSTORMING
                            </Typography>
                        </Button>
                        <Button color="inherit" component={renderLinkTopic}>TOPIC</Button>
                        <Button color="inherit">USERS</Button>
                        <Button color="inherit">CHAT</Button>
                    </Grid>
                    <Grid item>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        size="small"
                        onClick={handleMenu}
                        color="inherit">
                            <Typography variant="h6" className={classes.title}>
                                {user ? `${user.username} ` : ''}
                            </Typography>
                            <AccountCircle />
                        </IconButton>
                        <StyledMenu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            id="long-menu"
                            PaperProps={{
                                style: {
                                    maxHeight: 45 * 4.5,
                                    width: '25ch',
                                }
                            }}>
                            <StyledMenuItem onClick={myDashboard}>
                                <ListItemIcon>
                                    <DashboardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="My dashboard" />
                            </StyledMenuItem>
                            <Divider />
                            <StyledMenuItem onClick={handleClose, logout}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </StyledMenuItem>
                        </StyledMenu>
                    </Grid>
                </Grid>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Grid justify="space-between" container>
                <Grid item>
                    <Button edge="start" component={renderLinkTopic}>
                        <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}>
                            BRAINSTORMING
                        </Typography>
                    </Button>
                    <Button color="inherit" component={renderLinkTopic}>TOPIC</Button>
                    <Button color="inherit">USERS</Button>
                </Grid>
                <Grid item>
                    <Button component={renderLinkLogin}>
                        Sign In
                    </Button>
                    <Button component={renderLinkSignup}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
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