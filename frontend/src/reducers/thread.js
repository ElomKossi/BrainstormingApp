import {
    FETCH_THREAD_REQUEST,
    FETCH_THREAD_SUCCESS,
    FETCH_THREAD_FAILURE,

    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
    CREATE_THREAD_FAILURE,

    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,
} from '../actions/types';

const threadInitialState = {
    name: null,
    content: null,
    pinned: false,
    is_open: true,
    creator: null,
    createdt: null,
    ideas: [],
    error: null,
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
    isDeleting: false,
    deleteError: null,
};

const initialState = {
    ...threadInitialState,
    ...newThreadInitialState,
    ...deleteThreadInitialState,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_THREAD_REQUEST:
            return {
                ...initialState,
                error: null,
            };
        case FETCH_THREAD_SUCCESS:
            return {
                ...state,
                name: action.thread.name,
                content: action.thread.content,
                pinned: action.thread.pinned,
                is_open: action.thread.is_open,
                creator: action.thread.creator,
                createdAt: action.thread.created_at,
                ideas: action.thread.ideas,
                error: null,
            };
        case FETCH_THREAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
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
                isDeleting: true,
                deleteError: null,
            };
        case DELETE_THREAD_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                deleteError: null,
            };
        case DELETE_THREAD_FAILURE:
            return {
                ...state,
                isDeleting: false,
                deleteError: action.error,
            };
        default:
            return state;
    }
}