import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import TopicList from "../../components/Topic/TopicList";
import NewTopic from "../../components/Topic/NewTopic";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { fetchTopicsList, fetchTopic, createTopic } from "../../actions/topic";

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
    newTopicError,
    createTopic,
    createTopicSave,
    topics,
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
          <NewTopic
            onCloseModal={handleClose}
            isAuthenticated={isAuthenticated}
            success={newTopicSuccess}
            name={newTopicName}
            description={newTopicDescription}
            id={newTopicId}
            error={newTopicError}
            createTopic={createTopic}
            updateNewTopic={createTopicSave} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )

  if (isAuthenticated) {
    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          ADD TOPIC
          </Button>
        { openModal}
        <TopicList topics={topics} />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <TopicList topics={topics} />
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  newTopicSuccess: state.topic.newTopicSuccess,
  newTopicName: state.topic.newTopicName,
  newTopicDescription: state.topic.newTopicDescription,
  newTopicId: state.topic.newTopicId,
  newTopicError: state.topic.newTopicError,

  topics: state.topicsList.topics,
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
  // createTopicSave: newTopic => {
  //   dispatch(createTopicSave(newTopic));
  // },
  // createTopicToggle: () => {
  //   dispatch(createTopicToggle());
  // },
});

export default connect(mapStateToProps, mapDispatchToProps,)(Topic);