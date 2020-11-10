import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    createThreadSave,
    createThreadToggle,
    fetchTopic,
    createThread,
} from '../../actions/topic';
import TopicList from '../../components/Topic/TopicList';
import NewTopic from '../../components/Topic/NewTopic';

class Topic extends Component {

    componentDidMount() {
        const {topic} = this.props.match.params;
        this.props.fetchTopic();
    }

    static getDerivedStateFromProp(newProps) {
        const {topic: oldTopic} = this.props.match.params;
        const {topic: futureTopic} = newProps.match.params;
        if (oldTopic !== futureTopic) {
          this.props.fetchTopic(futureTopic);
        }
    }

    render() {
        const {
            isLoading,
            name,
            slug,
            description,
            threads,
            error,
            isAuthenticated,
            newTopicLoading,
            newTopicSuccess,
            newTopicName,
            newTopicDescription,
            newTopicId,
            newTopicError,
            newTopicShow,
            createTopic,
            createTopicSave,
            createTopicToggle,
        } = this.props;

        return(
            <div>
            <NewTopic
              topic={slug}
              isAuthenticated={isAuthenticated}
              isLoading={newTopicLoading}
              success={newTopicSuccess}
              name={newTopicName}
              description={newTopicDescription}
              id={newTopicId}
              error={newTopicError}
              showEditor={newTopicShow}
              createTopic={createTopic}
              updateNewTopic={createTopicSave}
              toggleShowEditor={createTopicToggle}
              maxLength={2000}
            />
            <TopicList
              isLoading={isLoading}
              name={name}
              slug={slug}
              description={description}
              threads={threads}
              error={error}
            />
          </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.topic,
    isLoading: state.topic.isLoading,
    name: state.topic.name,
    slug: state.topic.slug,
    description: state.topic.description,
    threads: state.topic.threads,
    error: state.topic.error,
    isAuthenticated: state.auth.isAuthenticated,
    newTopicLoading: state.topic.newTopicLoading,
    newTopicSuccess: state.topic.newTopicSuccess,
    newTopicName: state.topic.newTopicName,
    newTopicDescription: state.topic.newTopicDescription,
    newTopicId: state.topic.newTopicId,
    newTopicError: state.topic.newTopicError,
    newTopicShow: state.topic.newTopicShow,
    //userData: state.auth.user
});

export default connect(mapStateToProps, { createTopic })(Topic);