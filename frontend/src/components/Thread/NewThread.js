import React, { useState } from "react";
import {Link} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import StatusMessage from '../StatusMessage/StatusMessage'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
    },
    paper: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const NewThread = (props) => {

    const classes = useStyles();

    const {
        isAuthenticated,
        isLoading,
        success,
        id,
        error,
        showEditor,
    } = props;

    const [formData, setFormData] = useState({
        name: "",
        content: ""
    });

    const { name, content } = formData;

    const toggleShowEditor = () => {
        props.toggleShowEditor();
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {topic,  createThread } = props;

        let newThread = {
            topic: topic,
            name: name,
            content: content,
        };

        createThread(newThread);
        props.onCloseModal();

    };

    const onCancel = () => {
        // reset & clear everything
        setFormData({
          name: '',
          content: '',
        });
        props.updateNewThread({
            name: '',
            content: '',
        });
        toggleShowEditor();
    };

    const statusMessage = (
      <StatusMessage
        error={error}
        errorMessage={error || 'Oops! Something went wrong.'}
        success={success}
        successMessage={
          <Link to={`/thread/${id}`}>{'Successful on creating thread'}</Link>
        }
      />
    );

    if (!showEditor) {
        return (
          <div className={classes.button}>
            {statusMessage} {/* this will only show the success message */}
            <Button variant="contained" color="primary" onClick={toggleShowEditor}>
                ADD THREAD
            </Button>
            <Button variant="contained" color="inherit" style={{float: 'right'}}>
                DELETE THIS TOPIC
            </Button>
            <Button variant="contained" color="secondary" style={{float: 'right'}}>
                CLOSE THIS TOPIC
            </Button>
          </div>
        );
    }

    return (
        <Container>
            <CssBaseline />
            <div className={classes.root}>
                {statusMessage}
                <form className={classes.form} loading={isLoading} onSubmit={e => handleSubmit(e)} noValidate>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={e => onChange(e)}/>

                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="content"
                    label="Content"
                    name="content"
                    autoComplete="content"
                    value={content}
                    onChange={e => onChange(e)}/>

                    <div className={classes.root}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary">
                            ADD
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="default"
                            disabled={isLoading}
                            onClick={onCancel}>
                            CLEAR
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );

}

export default (NewThread);