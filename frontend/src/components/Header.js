import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
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
            <Button>
                <Link to='/' color="inherit">
                    <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}>
                        BRAIN
                    </Typography>
                </Link>
            </Button>
            <div>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                    {user ? `${user.username}` : ''}
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
            </div>

            {/* <Nav className="mr-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <NavDropdown title={user ? `${user.username}` : ''} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav> */}
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
            {/* <Nav className="mr-auto">
                <Nav.Link>
                    <NavLink className="nav-link" exact to='/login'>Login</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink className="nav-link" exact to='/signup'>Sign Up</NavLink>
                </Nav.Link>
            </Nav> */}
        </Fragment>
    );

    return (
        <Fragment>
            <Toolbar className={classes.toolbar}>
                { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
            </Toolbar>
        </Fragment>
        // <Navbar bg="dark" variant="dark">
        //     <Navbar.Brand>
        //         <Link className="navbar-brand" to='/'>BRAIN</Link>
        //     </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav">
        //         { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
        //     </Navbar.Collapse>
        // </Navbar>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
    //userData: state.auth.user
});

export default connect(mapStateToProps, { logout })(Header);