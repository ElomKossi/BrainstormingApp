import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/Chat';
import SmsIcon from '@material-ui/icons/Sms';
import PinDropIcon from '@material-ui/icons/PinDrop';
import PersonIcon from '@material-ui/icons/Person';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const TopicList = (props) => {

    const classes = useStyles();

    const { topics } = props;

    if (!topics || topics.length === 0) {
        return (
            <div className={classes.root}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            There is no TOPIC
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const topicList = topics.map(topic => {
        let {
            name,
            slug,
            description,
            ideas_count,
            threads_count,
            creator,
            last_activity,
        } = topic;

        let lastActivity = (
            <div className="home-text home-vertical">{'—  No activity —'}</div>
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
                    <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                            {pinned ? <PinDropIcon /> : <ChatIcon /> }
                            <Link to={`/thread/${thread_id}`}>{thread_name}</Link>
                        </Grid>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        <PersonIcon /> {username}
                        <b>{`  —  ${naturaltime}`}</b>
                    </Typography>
                </Fragment>
            );
        }

        // if (data.error)
        //     return (
        //         <Card className={classes.root}>
        //             <CardContent>
        //                 <Typography className={classes.title} color="textSecondary" gutterBottom>
        //                 Word of the Day
        //                 </Typography>
        //                 <Typography variant="h5" component="h2">
        //                 be{bull}nev{bull}o{bull}lent
        //                 </Typography>
        //                 <Typography className={classes.pos} color="textSecondary">
        //                 adjective
        //                 </Typography>
        //                 <Typography variant="body2" component="p">
        //                 well meaning and kindly.
        //                 <br />
        //                 {'"a benevolent smile"'}
        //                 </Typography>
        //             </CardContent>
        //             <CardActions>
        //                 <Button size="small">Learn More</Button>
        //             </CardActions>
        //         </Card>
        //     );

        return (
            <Fragment>
                <Grid item xs={12} key={slug}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={5} sm container>
                                <Typography gutterBottom variant="subtitle1" component="h2" align="center">
                                    <Grid container direction="row" alignItems="center" wrap="nowrap">
                                        <ForumIcon />
                                        <Link to={`/topic/${slug}`}>{name}</Link>
                                    </Grid>
                                </Typography>
                                <Typography gutterBottom variant="body2">
                                    {description}
                                </Typography>
                                <Typography gutterBottom variant="body2" color="textSecondary">
                                    <PersonIcon /> {creator.username}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm container>
                                <Grid item xs={12} sm container>
                                    <Typography gutterBottom variant="subtitle2" component="h2" align="center">
                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                            <ChatIcon />
                                            {threads_count}
                                            {threads_count > 1 ? ' threads' : ' thread'}
                                        </Grid>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Typography gutterBottom variant="subtitle2" component="h2" align="center">
                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                            <SmsIcon />
                                            {ideas_count}
                                            {ideas_count > 1 ? ' ideas' : ' idea'}
                                        </Grid>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={5} sm container>
                                {lastActivity}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Fragment>
        );
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                { topicList }
            </Grid>
        </div>
    );
}

export default TopicList;


// const TopicList =({ data }) => {
// //class TopicList extends Component {

//     const classes = useStyles();

//     const bull = <span className={classes.bullet}>•</span>;

//     if (data.topics != null && data.error != null) {
//         const topicList = data.topics.map(topic => {
//             let {
//                 name,
//                 slug,
//                 description,
//                 ideas_count,
//                 threads_count,
//                 creator,
//                 last_activity,
//             } = topic;

//             let lastActivity = (
//                 <div className="home-text home-vertical">{'—  No activity —'}</div>
//             );

//             if (last_activity) {
//                 let {
//                     thread_id,
//                     thread_name,
//                     username,
//                     pinned,
//                     naturaltime,
//                 } = last_activity;

//                 thread_name =
//                     thread_name.length > 43
//                     ? thread_name.substring(0, 43) + '...'
//                     : thread_name;

//                 lastActivity = (
//                     <Fragment>
//                         <Typography gutterBottom variant="subtitle1" component="h2" align="center">
//                             <Grid container direction="row" alignItems="center" wrap="nowrap">
//                                 {pinned ? <PinDropIcon /> : <ChatIcon /> }
//                                 <Link to={`/thread/${thread_id}`}>{thread_name}</Link>
//                             </Grid>
//                         </Typography>
//                         <Typography gutterBottom variant="body2">
//                             <PersonIcon /> {username}
//                             <b>{`  —  ${naturaltime}`}</b>
//                         </Typography>
//                     </Fragment>
//                 );
//             }

//             if (data.error)
//                 return (
//                     <Card className={classes.root}>
//                         <CardContent>
//                             <Typography className={classes.title} color="textSecondary" gutterBottom>
//                             Word of the Day
//                             </Typography>
//                             <Typography variant="h5" component="h2">
//                             be{bull}nev{bull}o{bull}lent
//                             </Typography>
//                             <Typography className={classes.pos} color="textSecondary">
//                             adjective
//                             </Typography>
//                             <Typography variant="body2" component="p">
//                             well meaning and kindly.
//                             <br />
//                             {'"a benevolent smile"'}
//                             </Typography>
//                         </CardContent>
//                         <CardActions>
//                             <Button size="small">Learn More</Button>
//                         </CardActions>
//                     </Card>
//                 );

//             return (
//                 <Fragment>
//                     <Grid item xs={12} key={slug}>
//                         <Paper className={classes.paper}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={5} sm container>
//                                     <Typography gutterBottom variant="subtitle1" component="h2" align="center">
//                                         <Grid container direction="row" alignItems="center" wrap="nowrap">
//                                             <TopicIcon />
//                                             <Link to={`/topic/${slug}`}>{name}</Link>
//                                         </Grid>
//                                     </Typography>
//                                     <Typography gutterBottom variant="body2">
//                                         {description}
//                                     </Typography>
//                                     <Typography gutterBottom variant="body2" color="textSecondary">
//                                         <PersonIcon /> {creator.username}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={2} sm container>
//                                     <Grid item xs={12} sm container>
//                                         <Typography gutterBottom variant="subtitle2" component="h2" align="center">
//                                             <Grid container direction="row" alignItems="center" wrap="nowrap">
//                                                 <ChatIcon />
//                                                 {threads_count}
//                                                 {threads_count > 1 ? ' threads' : ' thread'}
//                                             </Grid>
//                                         </Typography>
//                                     </Grid>
//                                     <Grid item xs={12} sm container>
//                                         <Typography gutterBottom variant="subtitle2" component="h2" align="center">
//                                             <Grid container direction="row" alignItems="center" wrap="nowrap">
//                                                 <SmsIcon />
//                                                 {ideas_count}
//                                                 {ideas_count > 1 ? ' ideas' : ' idea'}
//                                             </Grid>
//                                         </Typography>
//                                     </Grid>
//                                 </Grid>
//                                 <Grid item xs={5} sm container>
//                                     {lastActivity}
//                                 </Grid>
//                             </Grid>
//                         </Paper>
//                     </Grid>
//                 </Fragment>
//             );
//         });

//         return (
//             <div className={classes.root}>
//                 <Grid container spacing={3}>
//                     { topicList }
//                 </Grid>
//             </div>
//         );
//     }

//     return (
//         <div className={classes.root}>
//             <Card className={classes.root}>
//                 <CardContent>
//                     <Typography variant="h5" component="h2">
//                         There is no TOPIC
//                     </Typography>
//                 </CardContent>
//             </Card>
//         </div>
//     );

// }

// const mapStateToProps = state => ({
//     // topics: state.topic,
//     // error: state.topic.error
//     // userData: state.auth.user
// });

// export default connect(mapStateToProps, {  })(TopicList);

// eslint-disable-next-line
{/* <ListGroup.Item key={ id }>
    <Container textAlign="left" padded="horizontally">
        <Row>
            <Col lg={5}>
                <Row>
                    <Icon.PencilSquare />
                    <Link to={`/topic/${slug}`}>{name}</Link>
                </Row>
                <Row>
                    {description}
                </Row>
            </Col>
            <Col lg={2}>
                <div className="home-column home-stats home-vertical">
                    <div style={{paddingBottom: '5px'}}>
                        <Icon.ListTask />
                        {threads_count}
                        {threads_count > 1 ? ' threads' : ' thread'}
                    </div>
                    <div>
                        <Icon.ChatDots />
                        {ideas_count}
                        {ideas_count > 1 ? ' ideas' : ' idea'}
                    </div>
                </div>
            </Col>
            <Col lg={5}>
                {lastActivity}
            </Col>
        </Row>
    </Container>
</ListGroup.Item> */}

// <div className="topicContainer">
//     <Card>
//         <ListGroup variant="flush">
//         { topicList }
//         </ListGroup>
//     </Card>
//     {/* <Segment.Group className="topic-list">{topicList}</Segment.Group> */}
// </div>

// const topicList = topics.map(topic => {
//     let {
//       name,
//       slug,
//       description,
//       ideas_count,
//       threads_count,
//       creator,
//       last_activity,
//     } = topic;

//     name = name.length > 57 ? name.substring(0, 55) + '...' : name;

//     let lastActivity = last_activity ? (
//         <div className="topic-row">
//             <div className="topic-column">
//                 <div className="topic-name">{last_activity.name}</div>
//                 <div className="topic-meta">
//                 <Link to={`/user/${last_activity.username}`}>
//                     <Icon.PersonCircle />
//                     {last_activity.username}
//                 </Link>
//                 <b>{`  —  ${last_activity.naturaltime}`}</b>
//                 </div>
//             </div>
//         </div>
//     ) : (
//         <div className="topic-text topic-vertical">{'—  No activity —'}</div>
//     );

//     return (
//         <ListGroup.Item key={ id }>
//             <Container textAlign="left" padded="horizontally">
//                 <Row>
//                     <Col lg={5}>
//                         <div className="topic-row">
//                             <div className="topic-column">
//                                 <div>
//                                     {pinned ? <Icon.BookmarkCheckFill /> : <Icon.BookmarkDash /> }
//                                     {/* <Icon name={pinned ? 'pin' : 'talk outline'} /> */}
//                                     <Link to={`/thread/${id}`}>{name}</Link>
//                                     </div>
//                                     <div className="topic-meta">
//                                     <Link to={`/user/${creator}`}>
//                                         <Icon.PersonCircle />
//                                         {creator}
//                                     </Link>
//                                     <b>{`  —  ${naturaltime}`}</b>
//                                 </div>
//                             </div>
//                         </div>
//                     </Col>
//                     <Col lg={2}>
//                         <div className="topic-column topic-stats topic-vertical">
//                             <div style={{paddingBottom: '5px'}}>
//                                 <Icon.ListTask />
//                                 {threads_count}
//                                 {threads_count > 1 ? ' threads' : ' thread'}
//                             </div>
//                         </div>
//                     </Col>
//                     <Col lg={5}>
//                         {lastActivity}
//                     </Col>
//                 </Row>
//             </Container>
//         </ListGroup.Item>
//     );
// });

// return (
//     <div className="topicContainer">
//         <Card>
//             <ListGroup variant="flush">
//             { topicList }
//             </ListGroup>
//         </Card>
//         {/* <Segment.Group className="topic-list">{topicList}</Segment.Group> */}
//     </div>
// );