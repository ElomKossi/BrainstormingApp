import axios from 'axios';
import {
    FETCH_THREAD_REQUEST,
    FETCH_THREAD_SUCCESS,
    FETCH_THREAD_FAILURE,
    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
    CREATE_THREAD_FAILURE,
    CREATE_THREAD_SAVE,
    CREATE_THREAD_TOGGLE,
    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,

    USER_LOADED_FAIL,
} from './types';

export const fetchThread = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: FETCH_THREAD_REQUEST
            })

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/thread/`, config);

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

export const createThread = (newThread) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: CREATE_THREAD_REQUEST
            })

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/thread/create/`, newThread, config);

            dispatch({
                type: CREATE_THREAD_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CREATE_THREAD_FAILURE
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

export const deleteThread = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: DELETE_THREAD_REQUEST
            })
            url = '/thread/' + idTopic + '/delete/'
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}` + url, newTopic, config);

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