import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import topicsList from './topicsList';
import topic from './topic';
import thread from './thread';

export default combineReducers({
    auth,
    profile,
    topicsList,
    topic,
    thread,
});