import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const StatusMessage = (props) =>  {

    const classes = useStyles();

    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => {});
    React.useEffect(() => {
        progressRef.current = () => {
        if (progress > 100) {
            setProgress(0);
            setBuffer(10);
        } else {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
        }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
        progressRef.current();
        }, 500);

        return () => {
        clearInterval(timer);
        };
    }, []);

    const {
        loading,
        loadingMessage,
        error,
        errorMessage,
        success,
        successMessage,
        nothing,
        nothingMessage,
    } = props;

    if (loading) {
        return (
            <Container maxWidth="lg">
                <div className={classes.root}>
                <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                <Alert severity="info">{loadingMessage || 'We are fetching the content for you.'}</Alert>
                </div>
            </Container>
        );
    } else if (error) {
        return (
            <Container maxWidth="lg">
                <div className={classes.root}>
                <Alert severity="error">{errorMessage || error || 'Sorry, something went wrong'}</Alert>
                <br />
                </div>
            </Container>
        );
    } else if (success) {
        return (
            <Container maxWidth="lg">
                <div className={classes.root}>
                <Alert severity="success">{successMessage || 'Successful'}</Alert>
                <br />
                </div>
            </Container>
        );
    } else if (nothing) {
        return (
            <Container maxWidth="lg">
                <div className={classes.root}>
                <Alert severity="warning">{nothingMessage || 'Nothing to display'}</Alert>
                <br />
                </div>
            </Container>
        );
    }
    return null;

}

export default StatusMessage;