import React, { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';

import StatusMessage from '../StatusMessage/StatusMessage'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    list: {
      width: '100%',
      maxWidth: 650,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    cardRoot: {
        minWidth: 275,
    },
    pos: {
      marginBottom: 12,
    },
}));

function ListItemLink(props) {
    const classes = useStyles();
    const { primary, secondary, replies_count, to, content, creator } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Fragment>
            <ListItem button component={renderLink}>
                <ListItemAvatar>
                    <Avatar>
                        {creator.toUpperCase()}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <div className={classes.cardRoot}>
                <Card className={classes.cardRoot}>
                    <CardContent>
                        <Typography variant="h6" component="p" color="textSecondary">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Chip
                            avatar={<Avatar>{replies_count} </Avatar>}
                            label={replies_count > 1 ? ' Replies' : ' Reply'}
                            color="primary"
                            size="small"
                            variant="outlined"
                        />
                    </CardActions>
                </Card>
            </div>
            </Collapse>
            <Divider />
        </Fragment>
    );
}

ListItemLink.propTypes = {
    to: PropTypes.string.isRequired,
};

const ThreadList = (props) => {

    const classes = useStyles();

    const {
        isAuthenticated,
        isLoading,
        error,
        threads,
        name,
        slug,
        description,
        creator,
        created_at,
    } = props;

    if (error || !threads || isLoading) {
        return (
          <StatusMessage
            error={error || !threads}
            errorMessage={error}
            loading={isLoading}
            loadingMessage={`We are fetching the topics for you`}
          />
        );
    }

    const topicPresent = (
        <Fragment key={slug}>
            <Grid item xs={12}>
                <Card className={classes.paper} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Topic: <b>{name}</b>
                        </Typography>
                        <Typography className={classes.pos} component="p" gutterBottom>
                            <i>Created by {creator != null ? creator.username : '...'}, {created_at}</i>
                        </Typography>
                        <Typography variant="body2" component="p">
                            {description}
                        <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )

    if (!threads || threads.length === 0) {
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    { topicPresent }
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                There is no THREADS
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }

    const threadList = threads.map(thread => {
        let {
            id,
            name,
            content,
            pinned,
            creator,
            naturaltime,
            replies_count,
            last_activity,
        } = thread;

        name = name.length > 57 ? name.substring(0, 55) + '...' : name;

        let lastActivity = last_activity ? (
            <Fragment>
                {`${last_activity.username} posted ${last_activity.naturaltime}`}
            </Fragment>
        ) : (
            '—  No activity —'
        );

        return (
            <Fragment key={id}>
                <ListItemLink
                    to={`/thread/${id}`}
                    primary={<b>{`${name}`}</b>}
                    secondary={lastActivity}
                    replies_count={replies_count}
                    content={content}
                    creator={creator.substring(0, 1)}/>
            </Fragment>
        );
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                { topicPresent }
                <List className={classes.root}>
                    { threadList }
                </List>
            </Grid>
        </div>
    );

}

export default ThreadList;