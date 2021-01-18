import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import StatusMessage from '../StatusMessage/StatusMessage'

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
}));

const NewTopic = (props) => {

    const classes = useStyles();

    const [formData, setFormData] = useState({
      name: "",
      description: ""
    });

    const { name, description } = formData;

    const toggleShowEditor = () => {
        props.toggleShowEditor();
    };

    const onSave = () => {
        // save to redux store (uncontrolled input way)
        const {name, description} = formData;
        props.updateNewTopic({
          name: name,
          description: description,
        });
        toggleShowEditor();
    };

    const onCancel = () => {
        // reset & clear everything
        setFormData({
          name: '',
          description: '',
        });
        props.updateNewTopic({
          name: '',
          description: description,
        });
        toggleShowEditor();
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, description} = formData;
        const {createTopic} = props;
        let newTopic = {
          name: name,
          description: description,
        };
        createTopic(newTopic);
      };

    const {
        isAuthenticated,
        isLoading,
        success,
        id,
        slug,
        error,
        showEditor,
    } = props;

    //const { name, description } = formData;

    if (!isAuthenticated) {
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

    const statusMessage = (
      <StatusMessage
        error={error}
        errorMessage={error || 'Oops! Something went wrong.'}
        success={success}
        successMessage={
          <Link to={`/topic/${slug}`}>{'Successful on creating topic'}</Link>
        }
      />
    );

    if (!showEditor) {
        return (
          <div>
            {statusMessage} {/* this will only show the success message  */}
            <Button variant="contained" color="primary" onClick={toggleShowEditor}>
                ADD TOPIC
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
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={description}
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
                        color="secondary"
                        disabled={isLoading}
                        onClick={onSave}>
                        Save Draft
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
    )
}

export default (NewTopic);