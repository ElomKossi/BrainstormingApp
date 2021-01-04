import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import {
    createIdea,
    deleteIdea
} from "../../actions/idea";

import { fetchThread, deleteThread } from "../../actions/thread";

import NewIdea from "../../components/Idea/NewIdea"
import IdeaList from "../../components/Idea/IdeaList"

import { makeStyles } from "@material-ui/core/styles";

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
        authenticatedUsername,
        authenticatedIsStaff,

        id,
        name,
        content,
        pinned,
        creator,
        createdAt,
        ideas,
        error,
        createIdea,
        newIdeaSuccess,
        newIdeaError,
        deleteIdeaList,
        deleteIdea,
        deleteThread,
    } = props;

    return (
        <div className={classes.root}>
            <IdeaList
                isAuthenticated={isAuthenticated}
                authenticatedUsername={authenticatedUsername}
                authenticatedIsStaff={authenticatedIsStaff}
                id={threadID}
                name={name}
                content={content}
                pinned={pinned}
                creator={creator}
                createdAt={createdAt}
                ideas={ideas}
                error={error}
                deleteIdeaList={deleteIdeaList}
                deleteIdea={deleteIdea}/>
            <NewIdea
                isAuthenticated={isAuthenticated}
                threadID={threadID}
                createIdea={createIdea}
                success={newIdeaSuccess}
                error={newIdeaError}
                maxLength={2000}/>
        </div>
    );

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authenticatedUsername: state.auth.username,
    authenticatedIsStaff: state.auth.isStaff,

    name: state.thread.name,
    content: state.thread.content,
    pinned: state.thread.pinned,
    creator: state.thread.creator,
    createdAt: state.thread.createdAt,
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