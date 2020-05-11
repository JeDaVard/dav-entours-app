import * as actions from './types';
import { fetchData } from "../../../utils/asyncFetchDispatch";

const fetchUsersStart = () => ({
    type: actions.FETCH_USERS_START
})

const fetchUsersSUCCESS = users => ({
    type: actions.FETCH_USERS_SUCCESS,
    payload: {
        users
    }
})

const fetchUsersFailed = error => ({
    type: actions.FETCH_USERS_FAILED,
    error
})

const fetchUserStart = () => ({
    type: actions.FETCH_USER_START
})

const fetchUserSUCCESS = user => ({
    type: actions.FETCH_USER_SUCCESS,
    payload: {
        user
    }
})

const fetchUserFailed = error => ({
    type: actions.FETCH_USER_FAILED,
    error
})

export const fetchTopUsers = () => (
    fetchData(fetchUsersStart, fetchUsersSUCCESS, fetchUsersFailed, 'http://localhost:5000/api/user')
)

export const fetchUser = (id, readyState) => {
    if (readyState) {
        return dispatch => {
            dispatch(fetchUserSUCCESS(readyState))
        }
    } else {
        return fetchData(fetchUserStart, fetchUserSUCCESS, fetchUserFailed, `http://localhost:5000/api/user/${id}`)
    }
}