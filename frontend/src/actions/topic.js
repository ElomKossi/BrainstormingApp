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

    CREATE_TOPIC_SAVE,
    CREATE_TOPIC_TOGGLE,

    USER_LOADED_FAIL,
} from './types';

export const fetchTopic = () => async dispatch =>  {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: FETCH_TOPIC_REQUEST
            })

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/topic/`, config);

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

export const createTopic = (newTopic) => async dispatch =>  {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: CREATE_TOPIC_REQUEST
            })

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/topic/create/`, newTopic, config);

            dispatch({
                type: CREATE_TOPIC_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CREATE_TOPIC_FAILURE
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
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: DELETE_TOPIC_REQUEST
            })
            url = '/topic/' + idTopic + '/delete/'
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}` + url, newTopic, config);

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