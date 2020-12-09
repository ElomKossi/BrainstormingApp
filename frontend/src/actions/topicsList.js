import axios from 'axios';
import {
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,

    USER_LOADED_FAIL,
} from '../actions/types';

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

            const res = await axios.get(`${process.env.REACT_APP_API_URL}topic/`, config);

            dispatch({
                type: FETCH_TOPICS_SUCCESS,
                payload: res.data
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