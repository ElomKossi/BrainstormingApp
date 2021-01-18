import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/profile';
import Profile from '../../components/Profile/Profile';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Dashboard = (props) => {

    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const {username} = props.match.params;
            await props.fetchUserProfile(username);
          } catch (err) {

          }
        }

        fetchData();
        // eslint-disable-next-line
    }, []);

    const {
        username,
        first_name,
        last_name,
        email,
        topics,
        threads,
        ideas,
        error,
    } = props;
    console.log(props)

    return (
      <div className={classes.root}>
        <Profile
          username={username}
          first_name={first_name}
          last_name={last_name}
          email={email}
          topics={topics}
          threads={threads}
          ideas={ideas} />
      </div>
    );

};

const mapStateToProps = state => ({
    //isLoading: state.userProfile.isLoading,
    username: state.profile.username,
    first_name: state.profile.first_name,
    last_name: state.profile.last_name,
    email: state.profile.email,
    topics: state.profile.topics,
    threads: state.profile.threads,
    ideas: state.profile.ideas,
    error: state.profile.error,
  });

  const mapDispatchToProps = dispatch => ({
    fetchUserProfile: username => {
      dispatch(fetchUserProfile(username));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps, )(Dashboard);