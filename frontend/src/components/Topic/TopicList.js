import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTopic } from '../../actions/topic';
import { Card, Container, Row, Col, ListGroup  } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import './styles.css';

class TopicList extends Component {

    render() {
        const { topics } = this.props;

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
                  <div className="home-row">
                    <div className="home-column">
                      <div>
                        {pinned ? <Icon.BookmarkCheckFill /> : <Icon.BookmarkDash /> }
                        <Link to={`/thread/${thread_id}`}>{thread_name}</Link>
                      </div>
                      <div className="home-meta">
                        {/* <Link to={`/user/${username}`}>
                        </Link> */}
                          <Icon.Person />
                          {username}
                        <b>{`  —  ${naturaltime}`}</b>
                      </div>
                    </div>
                  </div>
                );
            }

            return (
                <ListGroup.Item key={ id }>
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
                </ListGroup.Item>
            );
        });

        return (
            <div className="forumContainer">
                <Card>
                    <ListGroup variant="flush">
                    { topicList }
                    </ListGroup>
                </Card>
                {/* <Segment.Group className="forum-list">{topicList}</Segment.Group> */}
            </div>
        );

    }
}

const mapStateToProps = state => ({
    auth: state.topic
    //userData: state.auth.user
});

export default connect(mapStateToProps, {  })(TopicList);


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
//         <div className="forum-row">
//             <div className="forum-column">
//                 <div className="forum-name">{last_activity.name}</div>
//                 <div className="forum-meta">
//                 <Link to={`/user/${last_activity.username}`}>
//                     <Icon.PersonCircle />
//                     {last_activity.username}
//                 </Link>
//                 <b>{`  —  ${last_activity.naturaltime}`}</b>
//                 </div>
//             </div>
//         </div>
//     ) : (
//         <div className="forum-text forum-vertical">{'—  No activity —'}</div>
//     );

//     return (
//         <ListGroup.Item key={ id }>
//             <Container textAlign="left" padded="horizontally">
//                 <Row>
//                     <Col lg={5}>
//                         <div className="forum-row">
//                             <div className="forum-column">
//                                 <div>
//                                     {pinned ? <Icon.BookmarkCheckFill /> : <Icon.BookmarkDash /> }
//                                     {/* <Icon name={pinned ? 'pin' : 'talk outline'} /> */}
//                                     <Link to={`/thread/${id}`}>{name}</Link>
//                                     </div>
//                                     <div className="forum-meta">
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
//                         <div className="forum-column forum-stats forum-vertical">
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
//     <div className="forumContainer">
//         <Card>
//             <ListGroup variant="flush">
//             { topicList }
//             </ListGroup>
//         </Card>
//         {/* <Segment.Group className="forum-list">{topicList}</Segment.Group> */}
//     </div>
// );