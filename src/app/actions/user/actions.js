import * as actions from './types';
import { fetchData } from '../../../utils/asyncFetchDispatch';
import { getCookie } from '../../../utils/cookies';

const fetchUsersStart = () => ({
    type: actions.FETCH_USERS_START,
});

const fetchUsersSUCCESS = (users) => ({
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

const fetchUserSUCCESS = (user) => ({
    type: actions.FETCH_USER_SUCCESS,
    payload: {
        user,
    },
});

const fetchUserFailed = (error) => ({
    type: actions.FETCH_USER_FAILED,
    error,
});

const fetchMeStart = () => ({
    type: actions.FETCH_ME_START,
});

const fetchMeSUCCESS = (me) => ({
    type: actions.FETCH_ME_SUCCESS,
    payload: {
        me,
    },
});

const fetchMeFailed = (error) => ({
    type: actions.FETCH_ME_FAILED,
    error,
});

export const fetchTopUsers = () =>
    fetchData(
        fetchUsersStart,
        fetchUsersSUCCESS,
        fetchUsersFailed,
        `${process.env.REACT_APP_SERVER}/api/user`
    );

export const fetchUser = (id, readyState) => {
    if (readyState) {
        return (dispatch) => {
            dispatch(fetchUserSUCCESS(readyState));
        };
    } else {
        return fetchData(
            fetchUserStart,
            fetchUserSUCCESS,
            fetchUserFailed,
            `${process.env.REACT_APP_SERVER}/api/user/${id}`
        );
    }
};

export const fetchMe = () => {
    return fetchData(
        fetchMeStart,
        fetchMeSUCCESS,
        fetchMeFailed,
        `${process.env.REACT_APP_SERVER}/api/user/me`,
        getCookie('authToken')
    );
};
