import * as actions from './types';
import { fetchData } from '../../../utils/asyncFetchDispatch';
import { getCookie } from '../../../utils/cookies';

const fetchUsersStart = () => ({
    type: actions.FETCH_USERS_START,
});

const fetchUsersSuccess = (users) => ({
    type: actions.FETCH_USERS_SUCCESS,
    payload: {
        users,
    },
});

const fetchUsersFailed = (error) => ({
    type: actions.FETCH_USERS_FAILED,
    error,
});

const fetchUserStart = () => ({
    type: actions.FETCH_USER_START,
});

const fetchUserSuccess = (user) => ({
    type: actions.FETCH_USER_SUCCESS,
    payload: {
        user,
    },
});

const fetchUserFailed = (error) => ({
    type: actions.FETCH_USER_FAILED,
    error,
});

const fetchUserSavedStart = () => ({
    type: actions.FETCH_USER_SAVED_START,
});

const fetchUserSavedSuccess = (saved) => ({
    type: actions.FETCH_USER_SAVED_SUCCESS,
    payload: {
        saved,
    },
});

const fetchUserSavedFailed = (error) => ({
    type: actions.FETCH_USER_SAVED_FAILED,
    error,
});

export const fetchTopUsers = () =>
    fetchData(
        fetchUsersStart,
        fetchUsersSuccess,
        fetchUsersFailed,
        `${process.env.REACT_APP_SERVER}/api/user`
    );

export const fetchUser = (id, me, readyState) => {
    if (readyState) {
        return (dispatch) => {
            dispatch(fetchUserSuccess(readyState));
        };
    } else if (me) {
        return fetchData(
            fetchUserStart,
            fetchUserSuccess,
            fetchUserFailed,
            `${process.env.REACT_APP_SERVER}/api/user/me`,
            getCookie('authToken')
        );
    } else {
        return fetchData(
            fetchUserStart,
            fetchUserSuccess,
            fetchUserFailed,
            `${process.env.REACT_APP_SERVER}/api/user/${id}`
        );
    }
};

export const fetchUserSaved = (id) => {
    return fetchData(
        fetchUserSavedStart,
        fetchUserSavedSuccess,
        fetchUserSavedFailed,
        `${process.env.REACT_APP_SERVER}/api/tour`, // TODO change the API !!!!!!!
        getCookie('authToken')
    );
};
