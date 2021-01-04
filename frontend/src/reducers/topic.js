import {
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,

    FETCH_TOPIC_REQUEST,
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPIC_FAILURE,

    CREATE_TOPIC_REQUEST,
    CREATE_TOPIC_SUCCESS,
    CREATE_TOPIC_FAILURE,

    DELETE_TOPIC_REQUEST,
    DELETE_TOPIC_SUCCESS,
    DELETE_TOPIC_FAILURE,

    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,
} from '../actions/types';

const topicInitialState = {
    name: null,
    slug: null,
    description: null,
    is_open: false,
    threads: null,
    error: null,
};

const newTopicInitialState = {
    newTopicSuccess: false,
    newTopicName: '',
    newTopicDescription: '',
    newTopicId: null,
    newTopicError: null,
};

const deleteThreadInitialState = {
    deleteThreadList: [],
};

const deleteTopicInitialState = {
    isDeleting: false,
    deleteError: null,
};

const initialState = {
    ...topicInitialState,
    ...newTopicInitialState,
    ...deleteThreadInitialState,
    ...deleteTopicInitialState,
};

export default function (state = initialState, action) {
    // const { type, payload } = action;

    switch (action.type) {
        case FETCH_TOPIC_REQUEST:
            return {
                ...state,
                newThreadSuccess: false,
                newThreadId: null,
                newThreadError: null,
                error: null,
            };
        case FETCH_TOPIC_SUCCESS:
            return {
                ...state,
                name: action.name,
                slug: action.slug,
                description: action.description,
                threads: action.threads,
                error: null,
            };
        case FETCH_TOPIC_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case DELETE_TOPIC_REQUEST:
            return {
                ...state,
                isDeleting: true,
                deleteError: null,
            };
        case DELETE_TOPIC_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                deleteError: null,
            };
        case DELETE_TOPIC_FAILURE:
            return {
                ...state,
                isDeleting: false,
                deleteError: action.error,
            };
        // Do IS_OPEN
        case CREATE_TOPIC_REQUEST:
            return {
                ...state,
                newTopicSuccess: false,
                newTopicError: null,
                newTopicName: action.newTopic.name,
                newTopicDescription: action.newTopic.description,
            };
        case CREATE_TOPIC_SUCCESS:
            return {
                ...state,
                newTopicSuccess: true,
                newTopicName: '',
                newTopicDescription: '',
                newTopicId: action.newTopic.id,
                newTopicError: null,
            };
        case CREATE_TOPIC_FAILURE:
            return {
                ...state,
                newTopicSuccess: false,
                newTopicId: null,
                newTopicError: action.error,
            };

        case DELETE_THREAD_REQUEST:
            return {
                ...state,
                deleteTopicList: [...state.deleteTopicList, action.id],
            };
        case DELETE_THREAD_SUCCESS:
        case DELETE_THREAD_FAILURE:
            return {
                ...state,
                deleteTopicList: state.deleteTopicList.filter(id => id !== action.id),
            };
        default:
            return state;

    }
}