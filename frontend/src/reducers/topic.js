import {
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

    CREATE_TOPIC_SAVE,
    CREATE_TOPIC_TOGGLE,
} from '../actions/types';

const topicInitialState = {
    isLoading: false,
    name: null,
    slug: null,
    description: null,
    creator: null,
    created_at:null,
    is_open: false,
    threads: null,
    error: null,
};

const newTopicInitialState = {
    newTopicLoading: false,
    newTopicSuccess: false,
    newTopicName: '',
    newTopicDescription: '',
    newTopicId: null,
    newTopicSlug: null,
    newTopicError: null,
    newTopicShow: false,
};

const newThreadInitialState = {
    newThreadLoading: false,
    newThreadSuccess: false,
    newThreadName: '',
    newThreadContent: '',
    newThreadId: null,
    newThreadError: null,
    newThreadShow: false,
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

    ...newThreadInitialState,
};

export default function (state = initialState, action) {
    // const { type, payload } = action;

    switch (action.type) {
        case FETCH_TOPIC_REQUEST:
            return {
                ...state,
                // newThreadLoading: false,
                // newThreadSuccess: false,
                // newThreadId: null,
                // newThreadError: null,
                // newTopicShow: false,
                // isLoading: true,
                // error: null,
                newThreadLoading: false,
                newThreadSuccess: false,
                newThreadId: null,
                newThreadError: null,
                newThreadShow: false,
                isLoading: true,
                error: null,
            };
        case FETCH_TOPIC_SUCCESS:
            return {
                ...state,
                // name: action.name,
                // slug: action.slug,
                // description: action.description,
                // threads: action.threads,
                // error: null,
                isLoading: false,
                name: action.name,
                slug: action.slug,
                description: action.description,
                threads: action.threads,
                creator: action.creator,
                created_at: action.created_at,
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
                // newTopicSuccess: false,
                // newTopicError: null,
                // newTopicName: action.newTopic.name,
                // newTopicDescription: action.newTopic.description,
                newTopicLoading: true,
                newTopicSuccess: false,
                newTopicError: null,
                newTopicName: action.newTopic.name,
                newTopicDescription: action.newTopic.description,
            };
        case CREATE_TOPIC_SUCCESS:
            return {
                ...state,
                // newTopicSuccess: true,
                // newTopicName: '',
                // newTopicDescription: '',
                // newTopicId: action.newTopic.id,
                // newTopicError: null,
                newTopicLoading: false,
                newTopicSuccess: true,
                newTopicName: '',
                newTopicDescription: '',
                newTopicId: action.newTopic.id,
                newTopicSlug: action.newTopic.slug,
                newTopicShow: false,
                newTopicError: null,
            };
        case CREATE_TOPIC_FAILURE:
            return {
                ...state,
                // newTopicSuccess: false,
                // newTopicId: null,
                // newTopicError: action.error,
                newTopicLoading: false,
                newTopicSuccess: false,
                newTopicId: null,
                newTopicSlug: null,
                newTopicShow: true,
                newTopicError: action.error,
            };

        case CREATE_TOPIC_SAVE:
            return {
            ...state,
            newTopicName: action.name,
            newTopicDescription: action.content,
            };
        case CREATE_TOPIC_TOGGLE:
            return {
            ...state,
            newTopicShow: !state.newTopicShow,
            newTopicSuccess: false,
            newTopicError: null,
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