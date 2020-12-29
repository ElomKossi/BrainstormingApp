import {
    FETCH_TOPIC_REQUEST,
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPIC_FAILURE,

    CREATE_TOPIC_REQUEST,
    CREATE_TOPIC_SUCCESS,
    CREATE_TOPIC_FAILURE,

    CREATE_THREAD_SAVE,
    CREATE_THREAD_TOGGLE,

    DELETE_TOPIC_REQUEST,
    DELETE_TOPIC_SUCCESS,
    DELETE_TOPIC_FAILURE,

    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
    CREATE_THREAD_FAILURE,

    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,
} from '../actions/types';

const topicInitialState = {
    isLoading: false,
    name: null,
    slug: null,
    description: null,
    is_open: false,
    pinned: false,
    creator: null,
    create_at: null,
    threads: null,
    error: null,
};

const newTopicInitialState = {
    newTopicSuccess: false,
    newTopicLoading: false,
    newTopicName: '',
    newTopicDescription: '',
    newTopicId: null,
    newTopicError: null,
    newTopicShow: false,
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
                ...topicInitialState,
                ...state,
                newTopicLoading: false,
                newTopicSuccess: false,
                newTopicId: null,
                newTopicError: null,
                newTopicShow: false,
                isLoading: true,
                error: null,
            };
        case FETCH_TOPIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                name: action.name,
                slug: action.slug,
                description: action.description,
                pinned: action.topic.pinned,
                creator: action.topic.creator,
                createdAt: action.topic.created_at,
                threads: action.topic.threads,
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
                newTopicLoading: true,
                newTopicSuccess: false,
                newTopicError: null,
                newTopicName: action.newTopic.name,
                newTopicDescription: action.newTopic.description,
            };
        case CREATE_TOPIC_SUCCESS:
            return {
                ...state,
                newTopicLoading: false,
                newTopicSuccess: true,
                newTopicName: '',
                newTopicDescription: '',
                newTopicId: action.newTopic.id,
                newTopicShow: false,
                newTopicError: null,
            };
        case CREATE_TOPIC_FAILURE:
            return {
                ...state,
                newTopicLoading: false,
                newTopicSuccess: false,
                newTopicId: null,
                newTopicShow: true,
                newTopicError: action.error,
            };

        case CREATE_THREAD_REQUEST:
            return {
                ...state,
                newThreadLoading: true,
                newThreadSuccess: false,
                newThreadError: null,
                newThreadName: action.newThread.name,
                newThreadContent: action.newThread.content,
            };
        case CREATE_THREAD_SUCCESS:
            return {
                ...state,
                newThreadLoading: false,
                newThreadSuccess: true,
                newThreadName: '',
                newThreadContent: '',
                newThreadId: action.newThread.id,
                newThreadShow: false,
                newThreadError: null,
            };
        case CREATE_THREAD_FAILURE:
            return {
                ...state,
                newThreadLoading: false,
                newThreadSuccess: false,
                newThreadId: null,
                newThreadShow: true,
                newThreadError: action.error,
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

        case CREATE_THREAD_SAVE:
            return {
                ...state,
                newTopicName: action.name,
                newTopicContent: action.description,
            };
        case CREATE_THREAD_TOGGLE:
            return {
                ...state,
                newTopicShow: !state.newTopicShow,
                newTopicSuccess: false,
                newTopicError: null,
            };
        default:
            return state;

    }
}