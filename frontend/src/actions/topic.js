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

    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,

    EDIT_TOPIC_REQUEST,

    USER_LOADED_FAIL,
} from './types';

import { TOPIC_URL, TOPIC_CREATE_URL, TOPIC_DELETE_URL } from './constants';

import { authHeader } from '../utils/config';

import { fetchTopicsList } from './topicsList'

export const fetchTopic = (topic) => async dispatch => {
    if (localStorage.getItem('access')) {
        // eslint-disable-next-line

        try {
            dispatch({
                type: FETCH_TOPIC_REQUEST
            })

            const res = await axios.get(TOPIC_URL + topic + '/', { headers: authHeader() });

            dispatch({
                type: FETCH_TOPIC_SUCCESS,
                name: res.data.name,
                slug: res.data.slug,
                description: res.data.description,
                threads: res.data.threads,
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

export const createTopic = (newTopic) => dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: CREATE_TOPIC_REQUEST,
            newTopic
        })

        try {
            const res = axios.post(TOPIC_CREATE_URL, newTopic, { headers: authHeader() })
                .then(response => {
                    let newTopic = response.data;

                    dispatch({
                        type: CREATE_TOPIC_SUCCESS,
                        newTopic
                    });

                    // re-Load Topics
                    dispatch({
                        type: FETCH_TOPICS_REQUEST
                    })
                    axios.get(`${process.env.REACT_APP_API_URL}topic/`, { headers: authHeader() })
                        .then(response => {
                            dispatch({
                                type: FETCH_TOPICS_SUCCESS,
                                topics: response.data
                            });
                        })
                        .catch(error => {
                            dispatch({
                                type: FETCH_TOPICS_FAILURE
                            });
                        });
                });
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

export const deleteTopic = (idTopic) => async dispatch => {
    if (localStorage.getItem('access')) {
        // eslint-disable-next-line

        try {
            dispatch({
                type: DELETE_TOPIC_REQUEST
            })

            const res = await axios.delete(TOPIC_URL + idTopic + TOPIC_DELETE_URL, { headers: authHeader() });
            const result = res.data
            dispatch({
                type: DELETE_TOPIC_SUCCESS,
                result
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

export const editTopic = (idTopic) => async dispatch => {
    dispatch({
        type: EDIT_TOPIC_REQUEST
    })
};