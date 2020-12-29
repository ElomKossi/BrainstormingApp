import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
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

const NewTopic = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const { name, description } = formData;

    // eslint-disable-next-line
    const onSave = () => {
        // save to redux store (uncontrolled input way)
        //const {name, description} = this.state;
        props.updateNewThread({
          name: name,
          description: description,
        });
    };

    // eslint-disable-next-line
    const onCancel = () => {
        // reset & clear everything
        setFormData({
          name: "",
          description: "",
        });
        props.updateNewThread({
          name: "",
          description: "",
        });
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // const onNameChange = (e, {value}) => {
    //     this.setState({
    //       name: value,
    //     });
    // };

    // const onDescriptionChange = (e, {value}) => {
    //     this.setState({
    //         description: value,
    //     });
    // };

    // eslint-disable-next-line
    const isFormValid = () => {
        const {name} = this.state;
        return name;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //const {name, description} = this.state;
        const { createTopic } = props;
        let newTopic = {
          name: name,
          description: description,
        };
        //const newTopic = JSON.stringify({ name, description })
        console.log(newTopic)
        createTopic(newTopic);
    };

    // eslint-disable-next-line
    const isValidLength = descriptionState => {
        const maxLength = this.props.maxLength || 100;
        return descriptionState.getPlainText("").length <= maxLength;
    };

        const classes = useStyles();

        const {
            isAuthenticated,
        } = props;

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

        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {/* onSubmit={e => onSubmit(e), props.onCloseModal} */}
                    <form className={classes.form} onSubmit={e => handleSubmit(e)} noValidate>

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

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    ADD
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={props.onCloseModal}>
                                    CANCEL
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );

}

export default (NewTopic);

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     //auth: state.topic
//     //userData: state.auth.user
// });

// export default connect(mapStateToProps, { createTopic })(NewTopic);

// const NewTopic = ({ createTopic, isAuthenticated }, props) => {
//     const classes = useStyles();

//     const [formData, setFormData] = useState({
//         name: "",
//         description: ""
//     });

//     const { name, description } = formData;

//     const onChange = e => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         console.log(JSON.stringify({ name, description }))
//         let newTopic = JSON.stringify({ name, description })
//         console.log(newTopic)

//         createTopic(newTopic);
//       }

//     // const onSubmit = e => {
//     //     e.preventDefault();

//     //     console.log(name)
//     //     console.log(description)
//     //     console.log(JSON.stringify({ name, description }))
//     //     let newTopic = {
//     //         name: name,
//     //         description: description,
//     //     };
//     //     createTopic(name, description);
//     // }

//     if (isAuthenticated) {
//         return(
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 {/* onSubmit={e => onSubmit(e), props.onCloseModal} */}
//                 <form className={classes.form} onSubmit={e => handleSubmit(e)} noValidate>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                             variant="outlined"
//                             required
//                             fullWidth
//                             id="name"
//                             label="Name"
//                             name="name"
//                             autoComplete="name"
//                             value={name}
//                             onChange={e => onChange(e)}/>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                             variant="outlined"
//                             required
//                             fullWidth
//                             multiline
//                             rows={4}
//                             id="description"
//                             label="Description"
//                             name="description"
//                             autoComplete="description"
//                             value={description}
//                             onChange={e => onChange(e)}/>
//                         </Grid>
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}>
//                         ADD
//                     </Button>
//                 </form>
//             </Container>
//         );
//     }

//     return (
//         <div className={classes.root}>
//             <Card className={classes.root}>
//                 <CardContent>
//                     <Typography variant="h5" component="h2">
//                         There is no TOPIC
//                     </Typography>
//                 </CardContent>
//             </Card>
//         </div>
//     );

// }