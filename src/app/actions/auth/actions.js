import * as actions from './types';
import { getCookie, setCookie, removeCookie } from "../../../utils/cookies";

const authStart = () => ({
    type: actions.AUTH_START,
});

const authSuccess = (id, token, photo, name) => ({
    type: actions.AUTH_SUCCESS,
    payload: {
        id,
        token,
        photo,
        name,
    },
});

const authFailed = (error) => ({
    type: actions.AUTH_FAILED,
    error,
});

export const auth = (data, login) => async (dispatch) => {
    try {
        dispatch(authStart());

        const url = login
            ? 'http://localhost:5000/api/user/login'
            : 'http://localhost:5000/api/user/sign-up';
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: login
                ? JSON.stringify({ email: data.email, password: data.password })
                : JSON.stringify(data),
        });

        const user = await response.json();
        if (user.error) return dispatch(authFailed(user.message));

        setCookie('userId', user.data.user._id, user.expires)
        setCookie('authToken', user.token, user.expires)
        setCookie('exp', user.expires, user.expires)

        localStorage.setItem('photo', user.data.user.photo);
        localStorage.setItem('name', user.data.user.name);

        dispatch(authSuccess(user.data.user._id, user.token, user.data.user.photo, user.data.user.name));
    } catch (e) {
        dispatch(authFailed(e.message));
    }
};

export const logout = () => {
    removeCookie('userId', 'authToken', 'exp');
    localStorage.setItem('photo', 'default.jpg')
    localStorage.setItem('name', 'Entours')
    return {
        type: actions.LOG_OUT
    }
}

export const checkAuth = () => (
    dispatch => {
        const token = getCookie('authToken');

        if (!token) {
            dispatch(logout());
        } else {
            const userId = getCookie('userId');
            const photo = localStorage.getItem('photo');
            const name = localStorage.getItem('name')
            dispatch(authSuccess(userId, token, photo, name));
        }
    }
);