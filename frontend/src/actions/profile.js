import axios from 'axios';
import {
    LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    SET_PASSWORD_SUCCESS,
    SET_PASSWORD_FAILURE,

    USER_LOADED_FAIL
} from './types';

import { USER_URL } from './constants';

import { authHeader } from '../utils/config';

export const fetchUserProfile = (username) => dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: LOAD_USER_PROFILE_REQUEST,
        })

        try {
            axios.get(USER_URL + username + '/', { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: LOAD_USER_PROFILE_SUCCESS,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    topics: response.data.topics,
                    threads: response.data.threads,
                    ideas: response.data.ideas,
                });
            });
        } catch (error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAILURE,
                error,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const updateProfile = (first_name, last_name, email) => async dispatch => {
    if (localStorage.getItem('access')) {
        const body = JSON.stringify({
            first_name,
            last_name,
            email,
        });

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, { headers: authHeader() });

            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                username: res.data.username,
                first_name: res.data.profile.first_name,
                last_name: res.data.profile.last_name,
                email: res.data.profile.email,
            });
        } catch (err) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAILURE
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const updatePassword = (new_password, re_new_password, current_password) => async dispatch => {
    if (localStorage.getItem('access')) {
        const body = JSON.stringify({ new_password, re_new_password, current_password });
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}auth/users/me/`, body, { headers: authHeader() });

            dispatch({
                type: SET_PASSWORD_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: SET_PASSWORD_FAILURE
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}