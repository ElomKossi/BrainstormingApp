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

    CREATE_TOPIC_SAVE ,
    CREATE_TOPIC_TOGGLE,

    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,

    EDIT_TOPIC_REQUEST,

    USER_LOADED_FAIL,
} from './types';

import { TOPIC_URL, TOPIC_CREATE_URL, TOPIC_DELETE_URL } from './constants';

import { authHeader } from '../utils/config';

export const fetchTopicsList = () => async dispatch =>  {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            dispatch({
                type: FETCH_TOPICS_REQUEST
            })

            const res = await axios.get(TOPIC_URL,  config);

            dispatch({
                type: FETCH_TOPICS_SUCCESS,
                topics: res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_TOPICS_FAILURE
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const fetchTopic = (topic) => async dispatch => {
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

            const res = await axios.get(TOPIC_URL + topic + '/', config);

            dispatch({
                type: FETCH_TOPIC_SUCCESS,
                name: res.data.name,
                slug: res.data.slug,
                description: res.data.description,
                threads: res.data.threads,
                creator: res.data.creator,
                created_at: res.data.created_at,
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
            axios.post(TOPIC_CREATE_URL, newTopic, { headers: authHeader() })
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
                    axios.get(TOPIC_URL, { headers: authHeader() })
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

            await axios.delete(TOPIC_URL + idTopic + TOPIC_DELETE_URL, { headers: authHeader() });

            dispatch({
                type: DELETE_TOPIC_SUCCESS,
            })

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

export const createTopicSave = newTopic => {
    return {
      type: CREATE_TOPIC_SAVE,
      name: newTopic.name,
      content: newTopic.description,
    };
  };

  export const createTopicToggle = () => {
    return {
      type: CREATE_TOPIC_TOGGLE,
    };
  };