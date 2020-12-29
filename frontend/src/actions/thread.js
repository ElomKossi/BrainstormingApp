import axios from 'axios';
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

    USER_LOADED_FAIL,
} from './types';

import { THREAD_URL, THREAD_CREATE_URL, THREAD_DELETE_URL } from './constants';

import { authHeader } from '../utils/config';

export const fetchThread = () => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            dispatch({
                type: FETCH_THREAD_REQUEST
            })

            const res = await axios.get(THREAD_URL, {headers: authHeader()});

            dispatch({
                type: FETCH_THREAD_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_THREAD_FAILURE
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
            const res = await axios.post(THREAD_CREATE_URL, newThread, {headers: authHeader()});

            dispatch({
                type: CREATE_THREAD_SUCCESS,
                payload: res
            })
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
            const res = await axios.delete(THREAD_URL + idThread + THREAD_DELETE_URL, {headers: authHeader()});

            dispatch({
                type: DELETE_THREAD_SUCCESS,
                payload: res.data
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