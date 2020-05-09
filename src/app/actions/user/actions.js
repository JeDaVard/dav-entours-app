import * as actions from './types';
import { fetchData } from "../../../utils/asyncFetchDispatch";

const fetchUserStart = () => ({
    type: actions.FETCH_USERS_START
})

const fetchUserSUCCESS = users => ({
    type: actions.FETCH_USERS_SUCCESS,
    payload: {
        users
    }
})

const fetchUserFailed = error => ({
    type: actions.FETCH_USERS_FAILED,
    error
})

export const fetchTopUsers = () => (
    fetchData(fetchUserStart, fetchUserSUCCESS, fetchUserFailed, 'http://localhost:5000/api/user')
)