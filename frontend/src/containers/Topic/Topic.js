import React, {  Fragment, useState } from "react";
import {connect} from "react-redux";
import TopicList from "../../components/Topic/TopicList";
import NewTopic from "../../components/Topic/NewTopic";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { fetchTopic, createTopic } from "../../actions/topic";
import { fetchTopicsList } from "../../actions/topicsList";

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
    //const {topic} = this.props.match.params;

    props.fetchTopicsList();
    // useEffect(() => {
    //   props.fetchTopicsList();
    // });

  // componentWillReceiveProps(newProps) {
  //   const {topic: oldTopic} = this.props.match.params;
  //   const {topic: futureTopic} = newProps.match.params;
  //   if (oldTopic !== futureTopic) {
  //     this.props.fetchTopic(futureTopic);
  //   }
  // }

    const {
      isAuthenticated,
      newTopicSuccess,
      newTopicName,
      newTopicDescription,
      newTopicId,
      newTopicError,
      newTopicShow,
      createTopic,
      createTopicSave,
      createTopicToggle,
      topics,
    } = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    if (isAuthenticated) {
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
                showEditor={newTopicShow}
                createTopic={createTopic}
                updateNewTopic={createTopicSave}
                toggleShowEditor={createTopicToggle}/>
            </DialogContent>
          </Dialog>
        </Fragment>
      )

      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              ADD TOPICS
            </Button>
            { openModal }

            <NewTopic
              //onCloseModal={handleClose}
              isAuthenticated={isAuthenticated}
              success={newTopicSuccess}
              name={newTopicName}
              description={newTopicDescription}
              id={newTopicId}
              error={newTopicError}
              showEditor={newTopicShow}
              createTopic={createTopic}
              updateNewTopic={createTopicSave}
              toggleShowEditor={createTopicToggle}
            />
            <TopicList topics = {topics} />
          </div>
        </Container>
      )
    }

    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <TopicList {...props} />
        </div>
      </Container>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  newTopicSuccess: state.topic.newTopicSuccess,
  newTopicName: state.topic.newTopicName,
  newTopicDescription: state.topic.newTopicDescription,
  newTopicId: state.topic.newTopicId,
  newTopicError: state.topic.newTopicError,
  newTopicShow: state.topic.newTopicShow,

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

export default connect( mapStateToProps, mapDispatchToProps, )(Topic);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// const Topic = ({ data, isAuthenticated }) => {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);

//   if (isAuthenticated) {
//     // eslint-disable-next-line
//     const handleClickOpen = () => {
//       setOpen(true);
//     };

//     const handleClose = () => {
//       setOpen(false);
//     };

//     // eslint-disable-next-line
//     const openModal = (
//       <Fragment>
//         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//           <DialogTitle id="form-dialog-title">Add Topic</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               To subscribe to this website, please enter your email address here. We will send updates
//               occasionally.
//             </DialogContentText>
//             <NewTopic onCloseModal={handleClose} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleClose} color="primary">
//               Subscribe
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Fragment>
//     )

//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.root}>
//           {/* <Button variant="contained" color="primary" onClick={handleClickOpen}>
//             ADD TOPICS
//           </Button>
//           { openModal } */}

//           <NewTopic onCloseModal={handleClose} />
//           <TopicList data={ {data} } />
//         </div>
//       </Container>
//     )
//   }

//   return(
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.root}>
//         <TopicList data={ {data} } />
//       </div>
//     </Container>
//   );

// }

// const mapStateToProps = state => ({
//     //auth: state.auth,
//     data: state.topicsList,
//     isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps, { fetchTopicsList })(Topic);