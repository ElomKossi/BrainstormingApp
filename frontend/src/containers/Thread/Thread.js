import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  createThread,
  deleteThread,
  createThreadSave,
  createThreadToggle
} from "../../actions/thread";

import { fetchTopic } from "../../actions/topic";

import NewThread from "../../components/Thread/NewThread"
import ThreadList from "../../components/Thread/ThreadList"

import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

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

const Thread = (props) => {

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { topic } = props.match.params;
        await props.fetchTopic(topic);
      } catch (err) {
        console.log("Error :", err)
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const {
    isLoading,
    isAuthenticated,

    name,
    slug,
    description,
    threads,
    creator,
    created_at,
    error,

    newThreadSuccess,
    newThreadName,
    newThreadContent,
    newThreadId,
    newThreadError,
    createThread,
    newThreadShow,
    createThreadSave,
    createThreadToggle,
  } = props;

  if (isAuthenticated) {
    return (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <NewThread
            topic={slug}
            isAuthenticated={isAuthenticated}
            success={newThreadSuccess}
            name={newThreadName}
            content={newThreadContent}
            id={newThreadId}
            error={newThreadError}
            showEditor={newThreadShow}
            createThread={createThread}
            updateNewThread={createThreadSave}
            toggleShowEditor={createThreadToggle}
            maxLength={2000}
            />
          <ThreadList
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            name={name}
            slug={slug}
            description={description}
            threads={threads}
            creator={creator}
            created_at={created_at}
            error={error}
          />
        </div>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
          <ThreadList
            isLoading={isLoading}
            name={name}
            slug={slug}
            description={description}
            threads={threads}
            creator={creator}
            created_at={created_at}
            error={error}
          />
      </div>
    </Container>
  );

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.topic.isLoading,

  name: state.topic.name,
  slug: state.topic.slug,
  description: state.topic.description,
  creator: state.topic.creator,
  created_at: state.topic.created_at,
  threads: state.topic.threads,
  error: state.topic.error,

  newThreadLoading: state.thread.newThreadLoading,
  newThreadSuccess: state.thread.newThreadSuccess,
  newThreadName: state.thread.newThreadName,
  newThreadContent: state.thread.newThreadContent,
  newThreadId: state.thread.newThreadId,
  newThreadError: state.thread.newThreadError,
  newThreadShow: state.thread.newThreadShow,
});

const mapDispatchToProps = dispatch => ({
  fetchTopic: topic => {
    dispatch(fetchTopic(topic));
  },
  createThread: newThread => {
    dispatch(createThread(newThread));
  },
  deleteThread: id => {
    dispatch(deleteThread(id));
  },
  createThreadSave: newThread => {
    dispatch(createThreadSave(newThread));
  },
  createThreadToggle: () => {
    dispatch(createThreadToggle());
  },
});

export default connect(mapStateToProps, mapDispatchToProps,)(Thread);