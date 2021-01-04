import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const action = (
        <div>
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
        </div>
    )

    const {
        id,
        isLoading,
        name,
        content,
        pinned,
        creator,
        createdAt,
        ideas,
        error,
        isAuthenticated,
        createIdea,
        newIdeaSuccess,
        newIdeaLoading,
        newIdeaError,
        authenticatedUsername,
        authenticatedIsStaff,
        deleteIdeaList,
        deleteIdea,
        isDeleting,
        deleteError,
        deleteThread,
    } = props;


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

    const IdeaList = ideas.map(idea => {
        const {
            id: ideaID,
            content: ideaContent,
            created_at: ideaCreatedAt,
            creator: ideaCreator,
        } = idea;

        return (
            <Fragment  key={idea.id}>
                <Grid item xs={12} >
                    <Card className={classes.paper}>
                        <CardHeader
                        action={action}
                        title={`${creator.first_name} ${creator.last_name}`}
                        subheader={`${creator.username} - ${idea.created_at}`}/>
                        <CardContent>
                            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                                {idea.content}
                            </Typography>
                            {/* <Grid container spacing={2}>
                                <Grid item xs={4} sm container>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                                            <Grid container direction="row" alignItems="center" wrap="nowrap">
                                                {creator.first_name} {creator.last_name}
                                            </Grid>
                                            <Grid container direction="row" alignItems="center" wrap="nowrap">
                                                <PersonIcon /> {creator.username} <i>{` - ${idea.created_at}`}</i>
                                                <Link to={`/user/${creator.username}`}>
                                                </Link>
                                            </Grid>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8} sm container>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom variant="subtitle2" component="h2" align="center">
                                            {idea.content}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </CardContent>
                    </Card>
                </Grid>
            </Fragment>
        );
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                { IdeaList }
            </Grid>
        </div>
    );

}

export default IdeaList;