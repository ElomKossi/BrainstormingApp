import {
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE
} from '../actions/types';

const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    topics: [],
    threads: [],
    ideas: [],
    error: null,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOAD_USER_PROFILE_REQUEST:
            return {
                ...state,
                //isLoading: true,
                error: null,
            };
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                //isLoading: false,
                username: action.username,
                first_name: action.first_name,
                last_name: action.last_name,
                email: action.email,
                topics: action.topics,
                threads: action.threads,
                ideas: action.ideas,
                error: null,
            };
        case LOAD_USER_PROFILE_FAILURE:
            return {
                ...initialState,
                error: action.error,
            };

        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: action.username,
                first_name: action.first_name,
                last_name: action.last_name,
                email: action.email,
                error: null
            }
        case UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state
            }
        default:
            return state
    };
};