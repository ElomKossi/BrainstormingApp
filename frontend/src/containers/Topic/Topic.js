import React, { useEffect } from "react";
import { connect } from "react-redux";
import TopicList from "../../components/Topic/TopicList";
import NewTopic from "../../components/Topic/NewTopic";

import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import { fetchTopicsList, fetchTopic, createTopic, createTopicSave, createTopicToggle } from "../../actions/topic";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  },
}));

const Topic = (props) => {

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchTopicsList();
      } catch (err) {

      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const {
    isAuthenticated,
    newTopicSuccess,
    newTopicName,
    newTopicDescription,
    newTopicId,
    newTopicSlug,
    newTopicError,
    newTopicLoading,
    newTopicShow,
    createTopic,
    createTopicSave,
    createTopicToggle,

    topics,
    isLoading,
    error,
  } = props;

  if (isAuthenticated) {
    return (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <NewTopic
            isAuthenticated={isAuthenticated}
            isLoading={newTopicLoading}
            success={newTopicSuccess}
            name={newTopicName}
            description={newTopicDescription}
            id={newTopicId}
            slug={newTopicSlug}
            error={newTopicError}
            showEditor={newTopicShow}
            createTopic={createTopic}
            updateNewTopic={createTopicSave}
            toggleShowEditor={createTopicToggle}
            maxLength={2000}
          />
          <Divider />
          <TopicList
            topics={topics}
            isLoading={isLoading}
            error={error}/>
        </div>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <TopicList
          topics={topics}
          isLoading={isLoading}
          error={error}/>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  newTopicLoading: state.topic.newTopicLoading,
  newTopicSuccess: state.topic.newTopicSuccess,
  newTopicName: state.topic.newTopicName,
  newTopicDescription: state.topic.newTopicDescription,
  newTopicId: state.topic.newTopicId,
  newTopicSlug: state.topic.newTopicSlug,
  newTopicError: state.topic.newTopicError,
  newTopicShow: state.topic.newTopicShow,

  topics: state.topicsList.topics,
  isLoading: state.topicsList.isLoading,
  error: state.topicsList.error,
});

const mapDispatchToProps = dispatch => ({
  fetchTopicsList: () => {
    dispatch(fetchTopicsList());
  },
  fetchTopic: topic => {
    dispatch(fetchTopic(topic));
  },
  createTopic: newTopic => {
    dispatch(createTopic(newTopic));
  },
  createTopicSave: newTopic => {
    dispatch(createTopicSave(newTopic));
  },
  createTopicToggle: () => {
    dispatch(createTopicToggle());
  },
});

export default connect(mapStateToProps, mapDispatchToProps,)(Topic);