import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
    createIdea,
    deleteIdea
} from "../../actions/idea";

import { fetchThread, deleteThread } from "../../actions/thread";

import NewIdea from "../../components/Idea/NewIdea"
import IdeaList from "../../components/Idea/IdeaList"
import StatusMessage from '../../components/StatusMessage/StatusMessage'
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

const Idea = (props) => {

    const classes = useStyles();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { thread } = props.match.params;
          await props.fetchThread(thread);
        } catch (err) {
          console.log("Error :", err)
        }
      }

      fetchData();
      // eslint-disable-next-line
    }, []);

    const {thread: threadID} = props.match.params;
    const {
        isAuthenticated,
        isLoading,
        id,
        name,
        content,
        pinned,
        creator,
        created_at,
        ideas,
        error,
        createIdea,
        newIdeaSuccess,
        newIdeaError,
        deleteIdeaList,
        deleteIdea,
        deleteThread,
        isDeleting,
        deleteError,

        username,
    } = props;


    if (error || deleteError || isLoading || isDeleting || !name) {
        let loadingMessage = 'We are fetching the thread for you';
        if (isDeleting) {
          loadingMessage = 'We are deleting the thread for you';
        }
        return (
          <StatusMessage
            error={error || deleteError || !name} // because a thread name cannot be empty
            errorMessage={error || deleteError}
            loading={isLoading || isDeleting}
            loadingMessage={loadingMessage}
            nothing={!name}
            nothingMessage={'Thread does not exist'}
          />
        );
    }

    if (isAuthenticated) {
        return (
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <IdeaList
                        isAuthenticated={isAuthenticated}
                        id={threadID}
                        name={name}
                        content={content}
                        pinned={pinned}
                        creator={creator}
                        created_at={created_at}
                        ideas={ideas}
                        error={error}
                        deleteIdeaList={deleteIdeaList}
                        deleteIdea={deleteIdea}
                        username={username}/>
                    <NewIdea
                        isAuthenticated={isAuthenticated}
                        threadID={threadID}
                        createIdea={createIdea}
                        success={newIdeaSuccess}
                        error={newIdeaError}
                        maxLength={2000}/>
                </div>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <IdeaList
                    isAuthenticated={isAuthenticated}
                    id={threadID}
                    name={name}
                    content={content}
                    pinned={pinned}
                    creator={creator}
                    created_at={created_at}
                    ideas={ideas}
                    error={error}
                    deleteIdeaList={deleteIdeaList}
                    deleteIdea={deleteIdea}/>
            </div>
        </Container>
    );

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.user.username,

    isLoading: state.thread.isLoading,
    name: state.thread.name,
    content: state.thread.content,
    pinned: state.thread.pinned,
    creator: state.thread.creator,
    created_at: state.thread.create_at,
    ideas: state.thread.ideas,
    error: state.thread.error,
    newIdeasuccess: state.thread.newIdeasuccess,
    newIdeaError: state.thread.newIdeaError,
    deleteIdeaList: state.thread.deleteIdeaList,
    isDeleting: state.thread.isDeleting,
    deleteError: state.thread.deleteError,
});

const mapDispatchToProps = dispatch => ({
    fetchThread: thread => {
        dispatch(fetchThread(thread));
    },
    createIdea: newIdea => {
        dispatch(createIdea(newIdea));
    },
    deleteIdea: (id, threadID) => {
        dispatch(deleteIdea(id, threadID));
    },
    deleteThread: id => {
        dispatch(deleteThread(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps,)(Idea);