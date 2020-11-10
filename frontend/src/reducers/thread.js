import {
    FETCH_THREAD_REQUEST,
    FETCH_THREAD_SUCCESS,
    FETCH_THREAD_FAILURE,

    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,

    CREATE_IDEA_REQUEST,
    CREATE_IDEA_SUCCESS,
    CREATE_IDEA_FAILURE,

    DELETE_IDEA_REQUEST,
    DELETE_IDEA_SUCCESS,
    DELETE_IDEA_FAILURE,

} from '../actions/types';

const threadInitialState = {
    isLoading: false,
    name: null,
    content: null,
    pinned: false,
    is_open: true,
    creator: null,
    createdt: null,
    ideas: [],
    error: null,
};

const newIdeaInitialState = {
    newIdeaSuccess: false,
    newIdeaLoading: false,
    newIdeaError: null,
};

const deleteIdeaInitialState = {
    deleteIdeaList: [],
};

const deleteThreadInitialState = {
    isDeleting: false,
    deleteError: null,
};

const initialState = {
    ...threadInitialState,
    ...newIdeaInitialState,
    ...deleteIdeaInitialState,
    ...deleteThreadInitialState,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_THREAD_REQUEST:
            return {
                ...initialState,
                isLoading: true,
                error: null,
            };
        case FETCH_THREAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                name: payload.thread.name,
                content: payload.thread.content,
                pinned: payload.thread.pinned,
                is_open: payload.thread.is_open,
                creator: payload.thread.creator,
                createdAt: payload.thread.created_at,
                ideas: payload.thread.ideas,
                error: null,
            };
        case FETCH_THREAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
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
                deleteError: payload.error,
            };

        case CREATE_IDEA_REQUEST:
            return {
                ...state,
                newPostLoading: true,
                newPostError: null,
                newPostSuccess: false,
            };
        case CREATE_IDEA_SUCCESS:
            return {
                ...state,
                newPostLoading: false,
                newPostError: null,
                newPostSuccess: true,
            };
        case CREATE_IDEA_FAILURE:
            return {
                ...state,
                newPostLoading: false,
                newPostError: payload.error,
                newPostSuccess: false,
            };

        case DELETE_IDEA_REQUEST:
            return {
                ...state,
                deletePostList: [...state.deletePostList, payload.id],
            };
        case DELETE_IDEA_SUCCESS:
        case DELETE_IDEA_FAILURE:
            return {
                ...state,
                deletePostList: state.deletePostList.filter(id => id !== payload.id),
            };
        default:
            return state;
    }
}