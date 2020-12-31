import {
    CREATE_IDEA_REQUEST,
    CREATE_IDEA_SUCCESS,
    CREATE_IDEA_FAILURE,

    DELETE_IDEA_REQUEST,
    DELETE_IDEA_SUCCESS,
    DELETE_IDEA_FAILURE,

} from '../actions/types';

const newIdeaInitialState = {
    newIdeaSuccess: false,
    newIdeaLoading: false,
    newIdeaError: null,
};

const deleteIdeaInitialState = {
    deleteIdeaList: [],
};

const initialState = {
    ...newIdeaInitialState,
    ...deleteIdeaInitialState,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_IDEA_REQUEST:
            return {
                ...state,
                newIdeaLoading: true,
                newIdeaError: null,
                newIdeaSuccess: false,
            };
        case CREATE_IDEA_SUCCESS:
            return {
                ...state,
                newIdeaLoading: false,
                newIdeaError: null,
                newIdeaSuccess: true,
            };
        case CREATE_IDEA_FAILURE:
            return {
                ...state,
                newIdeaLoading: false,
                newIdeaError: action.error,
                newIdeaSuccess: false,
            };

        case DELETE_IDEA_REQUEST:
            return {
                ...state,
                deleteIdeaList: [...state.deleteIdeaList, action.id],
            };
        case DELETE_IDEA_SUCCESS:
        case DELETE_IDEA_FAILURE:
            return {
                ...state,
                deleteIdeaList: state.deleteIdeaList.filter(id => id !== action.id),
            };
        default:
            return state;
    }
}