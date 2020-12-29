import { combineReducers } from 'redux';
import auth from './auth';
import topicsList from './topicsList';
import topic from './topic';
import thread from './thread';

export default combineReducers({
    auth,
    topicsList,
    topic,
    thread,
});