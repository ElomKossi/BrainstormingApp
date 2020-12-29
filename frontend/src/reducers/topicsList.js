import {
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,
} from '../actions/types';

const initialState = {
    topics: null,
    error: null,
};

export default function (state = initialState, action) {
    //const { type, payload } = action;

    switch (action.type) {
        case FETCH_TOPICS_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_TOPICS_SUCCESS:
            return {
                topics: action.topics,
                error: null,
            };
        case FETCH_TOPICS_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state
    }

}