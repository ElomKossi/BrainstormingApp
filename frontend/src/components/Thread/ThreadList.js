import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/Chat';
import SmsIcon from '@material-ui/icons/Sms';
import PinDropIcon from '@material-ui/icons/PinDrop';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

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

const ThreadList = (props) => {

    const classes = useStyles();

    const { threads } = props;

    if (!threads || threads.length === 0) {
        return (
            <div className={classes.root}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            There is no THREADS
                        </Typography>
                    </CardContent>
                </Card>
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
                <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                    <Grid container direction="row" alignItems="center" wrap="nowrap">
                        {last_activity.name}
                    </Grid>
                </Typography>
                <Typography gutterBottom variant="body2">
                    <PersonIcon /> {last_activity.username}
                    <b>{`  —  ${last_activity.naturaltime}`}</b>
                </Typography>
            </Fragment>
        ) : (
            <div className="forum-text forum-vertical">{'—  No activity —'}</div>
        );

        return (
            <Fragment key={id}>
                <Grid item xs={12} >
                    <Card className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={5} sm container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                            {/* <ForumIcon /> */}
                                            {pinned ? <PinDropIcon /> : <ChatIcon /> }
                                            <Link to={`/thread/${id}`}>{name}</Link>
                                        </Grid>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} container direction="row" alignItems="center" wrap="nowrap">
                                    <Typography gutterBottom variant="body2">
                                        {content}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                            <PersonIcon /> {creator}
                                            <b>{`  —  ${naturaltime}`}</b>
                                        </Grid>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sm container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle2" component="h2" align="center">
                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                            <SmsIcon />
                                            {replies_count}
                                            {replies_count > 1 ? ' replies' : ' reply'}
                                        </Grid>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={5} sm container>
                                {lastActivity}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Fragment>
        );

    })

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                { threadList }
            </Grid>
        </div>
    );

}

export default ThreadList;