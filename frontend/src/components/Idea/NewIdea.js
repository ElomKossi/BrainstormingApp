import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

const NewIdea = (props) => {

    const classes = useStyles();

    const {
        isAuthenticated,
    } = props;

    const [formData, setFormData] = useState({
        name: "",
        content: ""
    });

    const { name, content } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { threadID, createIdea } = props;

        let newIdea = {
            thread_id: threadID,
            content: content,
        };

        createIdea(newIdea);

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={e => handleSubmit(e)} noValidate>
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
                        onChange={e => onChange(e)} />

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                POST
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

}

export default (NewIdea);