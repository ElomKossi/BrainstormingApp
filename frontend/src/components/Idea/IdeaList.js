import React, { Fragment, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        justifyContent: 'flex-end',
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

const IdeaList = (props) => {

    const classes = useStyles();

    const {
        id,
        isLoading,
        name,
        content,
        pinned,
        creator,
        created_at,
        ideas,
        error,
        isAuthenticated,
        createIdea,
        newIdeaSuccess,
        newIdeaLoading,
        newIdeaError,
        deleteIdeaList,
        deleteIdea,
        isDeleting,
        deleteError,
        deleteThread,
        username
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onDelete = (id, ideaId) => {
        deleteIdea(id, ideaId);
    };

    if (!ideas || ideas.length === 0) {
        return (
            <div className={classes.root}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            There is no IDEAS
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const threadPresent = (
        <Fragment>
            <Grid item xs={12}>
                <Card className={classes.paper} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Thread: <b>{name}</b>
                        </Typography>
                        <Typography className={classes.pos} component="p" gutterBottom>
                            <i>Created by {creator != null ? creator.username : '...'} , {created_at}</i>
                        </Typography>
                        <Typography variant="body2" component="p">
                            {content}
                        <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )

    const stateAction = (
        <div className={classes.button} >
            <Button variant="contained" color="inherit" style={{float: 'right'}}>
                DELETE THIS THREAD
            </Button>
            <Button variant="contained" color="secondary" style={{float: 'right'}}>
                CLOSE THIS THREAD
            </Button>
        </div>
    )

    const action = (
        <div>
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVertIcon />
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
                            width: '20ch',
                        },
                    }}>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <InboxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Sent mail" />
                    </StyledMenuItem>
                </StyledMenu>
            </ListItemSecondaryAction>
        </div>
    )

    const actionDel = (id, ideaId) => (
        <div>
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVertIcon />
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
                            width: '20ch',
                        },
                    }}>
                    <StyledMenuItem onClick={onDelete(id, ideaId)}>
                        <ListItemIcon>
                            <HighlightOffIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Delete Idea" />
                    </StyledMenuItem>
                </StyledMenu>
            </ListItemSecondaryAction>
        </div>
    )

    const IdeaList = ideas.map(idea => {
        let {
            id: ideaID,
            content: ideaContent,
            created_at: ideaCreatedAt,
            creator: ideaCreator,
        } = idea;

        return (
            <Fragment  key={ideaID}>
                <Grid item xs={12} >

                    <List className={classes.root}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>
                                    {ideaCreator.username.substring(0, 1).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            primary={ideaContent}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary">
                                    {`${ideaCreator.first_name} ${ideaCreator.last_name}`} || {`${ideaCreator.username}`}
                                </Typography>
                                {` — ${ideaCreatedAt}`}
                                </React.Fragment>
                            }
                            />
                            {username === ideaCreator.username ? actionDel(id, ideaID) : action }
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                </Grid>
            </Fragment>
        );
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                { isAuthenticated ? stateAction : '' }
                { threadPresent }
                <List className={classes.root}>
                    { IdeaList }
                </List>
            </Grid>
        </div>
    );

}

export default IdeaList;