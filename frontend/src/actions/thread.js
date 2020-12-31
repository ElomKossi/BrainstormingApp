import axios from 'axios';
import {
    FETCH_TOPIC_REQUEST,
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPIC_FAILURE,

    FETCH_THREAD_REQUEST,
    FETCH_THREAD_SUCCESS,
    FETCH_THREAD_FAILURE,
    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
    CREATE_THREAD_FAILURE,
    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,

    CREATE_THREAD_SAVE,
    CREATE_THREAD_TOGGLE,

    USER_LOADED_FAIL,
} from './types';

import { fetchTopic } from "./topic";

import { THREAD_URL, THREAD_CREATE_URL, THREAD_DELETE_URL, TOPIC_URL } from './constants';

import { authHeader } from '../utils/config';

export const fetchThread = (thread) => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            dispatch({
                type: FETCH_THREAD_REQUEST
            })

            const res = axios.get(THREAD_URL + thread, {headers: authHeader()});

            const result = res.data
            dispatch({
                type: FETCH_THREAD_SUCCESS,
                result
            })
        } catch (err) {
            dispatch({
                type: FETCH_THREAD_FAILURE,
                err
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const createThread = (newThread) =>  dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: CREATE_THREAD_REQUEST,
            newThread
        })

        try {
            const res = axios.post(THREAD_CREATE_URL, newThread, {headers: authHeader()})
            .then(response => {
                let newThread = response.data;

                dispatch({
                    type: CREATE_THREAD_SUCCESS,
                    newThread
                });

                // re-Load Topics
                dispatch({
                    type: FETCH_TOPIC_REQUEST
                })
                axios.get(TOPIC_URL + newThread.topic + '/', { headers: authHeader() })
                    .then(response => {
                        dispatch({
                            type: FETCH_TOPIC_SUCCESS,
                            name: response.data.name,
                            slug: response.data.slug,
                            description: response.data.description,
                            threads: response.data.threads,
                        });
                    })
                    .catch(error => {
                        dispatch({
                            type: FETCH_TOPIC_FAILURE
                        });
                    });
            });
            const result = res.data
            console.log(result)
            console.log({result})
            console.log(res)
            dispatch({
                type: CREATE_THREAD_SUCCESS,
                result
            })

            // fetchTopic(newThread.topic)
        } catch (error) {
            dispatch({
                type: CREATE_THREAD_FAILURE,
                error
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const deleteThread = (idThread) => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: DELETE_THREAD_REQUEST
        })
        try {
            const res = axios.delete(THREAD_URL + idThread + THREAD_DELETE_URL, {headers: authHeader()});
            const result = res.data
            dispatch({
                type: DELETE_THREAD_SUCCESS,
                result
            })
        } catch (err) {
            dispatch({
                type: DELETE_THREAD_FAILURE
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const createThreadSave = newThread => {
    return {
        type: CREATE_THREAD_SAVE,
        name: newThread.name,
        content: newThread.content,
    };
};

export const createThreadToggle = () => {
    return {
        type: CREATE_THREAD_TOGGLE,
    };
};