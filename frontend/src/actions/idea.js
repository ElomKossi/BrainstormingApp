import axios from 'axios';
import {
    FETCH_THREAD_REQUEST,
    FETCH_THREAD_SUCCESS,
    FETCH_THREAD_FAILURE,

    CREATE_IDEA_REQUEST,
    CREATE_IDEA_SUCCESS,
    CREATE_IDEA_FAILURE,

    DELETE_IDEA_REQUEST,
    DELETE_IDEA_SUCCESS,
    DELETE_IDEA_FAILURE,

    USER_LOADED_FAIL
} from '../actions/types';

import {
    THREAD_URL,
    IDEA_URL,
    IDEA_CREATE_URL,
    IDEA_EDIT_URL,
    IDEA_DELETE_URL
} from './constants';

import { authHeader } from '../utils/config';

export const createIdea = newIdea => dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: CREATE_IDEA_REQUEST
        })

        try {
            console.log(newIdea)
            axios.post(IDEA_CREATE_URL, newIdea, {headers: authHeader()})
                .then(response => {
                    dispatch({
                        type: CREATE_IDEA_SUCCESS
                    });

                    // re-Load Threads
                    dispatch({
                        type: FETCH_THREAD_REQUEST
                    })
                    axios.get(THREAD_URL + newIdea.thread_id + '/', { headers: authHeader() })
                        .then(response => {
                            const thread = response.data
                            dispatch({
                                type: FETCH_THREAD_SUCCESS,
                                thread
                            });
                        })
                        .catch(err => {
                            dispatch({
                                type: FETCH_THREAD_FAILURE,
                                err
                            });
                        });
                });
        } catch (err) {
            dispatch({
                type: CREATE_IDEA_FAILURE,
                err
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const deleteIdea = (id, threadID) => dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: DELETE_IDEA_REQUEST,
            id,
        })

        try {
            axios.delete(IDEA_URL + id + IDEA_DELETE_URL, { headers: authHeader() })
                .then(response => {
                    dispatch({
                        type: DELETE_IDEA_SUCCESS,
                        id
                    });

                    // re-Load Threads
                    dispatch({
                        type: FETCH_THREAD_REQUEST
                    })
                    axios.get(THREAD_URL + threadID + '/', { headers: authHeader() })
                        .then(response => {
                            const result = response.data
                            dispatch({
                                type: FETCH_THREAD_SUCCESS,
                                result
                            });
                        })
                        .catch(err => {
                            dispatch({
                                type: FETCH_THREAD_FAILURE,
                                err
                            });
                        });
                });
        } catch (err) {
            dispatch({
                type: DELETE_IDEA_FAILURE,
                id,
                err
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const editIdea = (id, content) => {
    return axios.put(
        IDEA_URL + id + IDEA_EDIT_URL,
        {content: content},
        { headers: authHeader() },
    );
};