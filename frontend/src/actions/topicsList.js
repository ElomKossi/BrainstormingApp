import axios from 'axios';
import {
    FETCH_TOPICS_REQUEST,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_FAILURE,

    USER_LOADED_FAIL,
} from '../actions/types';
import {apiErrorHandler} from '../utils/errorhandler';

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
                topics: res.data
            })
        } catch (err) {
            const error = apiErrorHandler(err)
            dispatch({
                type: FETCH_TOPICS_FAILURE,
                error
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};