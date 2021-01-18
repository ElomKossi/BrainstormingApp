import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import StatusMessage from '../StatusMessage/StatusMessage'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
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
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));

const NewIdea = (props) => {

  const classes = useStyles();

  const {
      isAuthenticated,
      isLoading,
      error
  } = props;

  const [formData, setFormData] = useState({
      content: ""
  });

  const { content } = formData;

  const statusMessage = (
    <StatusMessage
      error={error}
      errorMessage={error || 'Oops! Something went wrong.'}
    />
  );

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
      setFormData({
          content: ""
      })
  };

  return (
      <Container>
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
                      onChange={e => onChange(e)}
                      InputProps={{endAdornment:
                          <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}>
                          ADD
                      </Button>}}/>
              </form>
          </div>
      </Container>
  );

}

export default (NewIdea);