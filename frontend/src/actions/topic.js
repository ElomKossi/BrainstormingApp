import axios from 'axios';
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

    EDIT_TOPIC_REQUEST,

    USER_LOADED_FAIL,
} from './types';

import { TOPIC_URL, TOPIC_CREATE_URL, TOPIC_DELETE_URL } from './constants';

import { authHeader } from '../utils/config';

export const fetchTopic = () => async dispatch =>  {
    if (localStorage.getItem('access')) {
        // eslint-disable-next-line

        try {
            dispatch({
                type: FETCH_TOPIC_REQUEST
            })

            const res = await axios.get(TOPIC_URL, {headers: authHeader()});

            dispatch({
                type: FETCH_TOPIC_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_TOPIC_FAILURE
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const createTopic = (newTopic) => dispatch =>  {
    if (localStorage.getItem('access')) {
        dispatch({
            type: CREATE_TOPIC_REQUEST,
            newTopic
        })

        try {
            const res = axios.post(TOPIC_CREATE_URL, newTopic, {headers: authHeader()});

            dispatch({
                type: CREATE_TOPIC_SUCCESS,
                res
            })
        } catch (error) {
            dispatch({
                type: CREATE_TOPIC_FAILURE,
                error
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const deleteTopic = (idTopic) => async dispatch =>  {
    if (localStorage.getItem('access')) {
        // eslint-disable-next-line

        try {
            dispatch({
                type: DELETE_TOPIC_REQUEST
            })

            const res = await axios.delete(TOPIC_URL + idTopic + TOPIC_DELETE_URL, {headers: authHeader()});

            dispatch({
                type: DELETE_TOPIC_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: DELETE_TOPIC_FAILURE
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const editTopic = (idTopic) => async dispatch =>  {
    dispatch({
        type: EDIT_TOPIC_REQUEST
    })
};