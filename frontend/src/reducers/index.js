import { combineReducers } from 'redux';
import auth from './auth';
import topic from './topic';

export default combineReducers({
    auth,
    topic
});