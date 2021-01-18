import {
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,
} from '../actions/types';

const initialState = {
    isLoading: false,
    topics: null,
    error: null,
};

export default function (state = initialState, action) {
    //const { type, payload } = action;

    switch (action.type) {
        case FETCH_TOPICS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_TOPICS_SUCCESS:
            return {
                isLoading: false,
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