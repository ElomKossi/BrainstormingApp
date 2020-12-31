import React, { Fragment, useState, useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    isAuthenticated,

    name,
    slug,
    description,
    threads,
    error,

    newThreadSuccess,
    newThreadName,
    newThreadContent,
    newThreadId,
    newThreadError,
    createThread,
    createThreadSave,
    createThreadToggle,
  } = props;

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
                  </DialogContentText>
          <NewThread
            onCloseModal={handleClose}
            topic={slug}
            isAuthenticated={isAuthenticated}
            success={newThreadSuccess}
            name={newThreadName}
            content={newThreadContent}
            id={newThreadId}
            error={newThreadError}
            createThread={createThread}
            updateNewThread={createThreadSave}
            toggleShowEditor={createThreadToggle}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )

  if (isAuthenticated) {
    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          ADD THREAD
            </Button>
        { openModal}
        <ThreadList
          name={name}
          slug={slug}
          description={description}
          threads={threads}
          error={error} />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <ThreadList
        name={name}
        slug={slug}
        description={description}
        threads={threads}
        error={error} />
    </div>
  );

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  name: state.topic.name,
  slug: state.topic.slug,
  description: state.topic.description,
  threads: state.topic.threads,
  error: state.topic.error,

  newThreadLoading: state.topic.newThreadLoading,
  newThreadSuccess: state.topic.newThreadSuccess,
  newThreadName: state.topic.newThreadName,
  newThreadContent: state.topic.newThreadContent,
  newThreadId: state.topic.newThreadId,
  newThreadError: state.topic.newThreadError,
  newThreadShow: state.topic.newThreadShow,
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