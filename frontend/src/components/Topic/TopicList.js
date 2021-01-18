import React, { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
    chip: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
}));

function ListItemLink(props) {
    const classes = useStyles();
    const { primary, secondary, nbThreads, nbIdeas, to, description, creator } = props;

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
                <ListItemSecondaryAction className={classes.chip}>
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
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton edge="end" aria-label="delete">
                            <Chip
                                avatar={<Avatar>{nbThreads} </Avatar>}
                                label={nbThreads > 1 ? ' Threads' : ' Thread'}
                                color="primary"
                                size="small"
                                variant="outlined"
                            />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <Chip
                                avatar={<Avatar>{nbIdeas} </Avatar>}
                                label={nbThreads > 1 ? ' Ideas' : ' Idea'}
                                color="secondary"
                                size="small"
                                variant="outlined"
                            />
                        </IconButton>
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

const TopicList = (props) => {

    const classes = useStyles();

    const { isLoading, error, topics } = props;

    if (!topics || topics.length === 0) {
        return (
            <div className={classes.root}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            There is no TOPICS
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error || isLoading ) {
        return (
          <StatusMessage
            error={error || !topics}
            errorMessage={error}
            loading={isLoading}
            loadingMessage={'We are fetching the list of topics for you'}
          />
        );
    }

    const topicList = topics.map(topic => {
        let {
            name,
            slug,
            description,
            ideas_count,
            threads_count,
            created_at,
            creator,
            last_activity,
        } = topic;

        let lastActivity = (
            '—  No activity —'
        );

        if (last_activity) {
            let {
                thread_id,
                thread_name,
                username,
                pinned,
                naturaltime,
            } = last_activity;

            thread_name =
                thread_name.length > 43
                ? thread_name.substring(0, 43) + '...'
                : thread_name;

            lastActivity = (
                <Fragment>
                    {`${username} post in ${thread_name}`}
                </Fragment>
            );
        }

        return (
            <Fragment key={slug}>
                <ListItemLink
                    to={`/topic/${slug}`}
                    primary={<b>{`${name}`}</b>}
                    secondary={lastActivity}
                    nbThreads={threads_count}
                    nbIdeas={ideas_count}
                    creator={creator.slice(0, -1).split('user/')[1].substr(0, 1)}
                    description={description}/>
            </Fragment>
        );
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <List className={classes.root}>
                    { topicList }
                </List>
            </Grid>
        </div>
    );
}

export default TopicList;