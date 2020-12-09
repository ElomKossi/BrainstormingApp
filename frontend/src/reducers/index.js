import { combineReducers } from 'redux';
import auth from './auth';
import topic from './topic';
import topicsList from './topicsList';

export default combineReducers({
    auth,
    topic,
    topicsList
});