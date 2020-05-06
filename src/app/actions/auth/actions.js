import * as actions from './types';

const authStart = () => ({
    type: actions.AUTH_START
});

const authSuccess = (id, token) => ({
    type: actions.AUTH_SUCCESS,
    payload: {
        id,
        token
    }
});

const authFailed = error => ({
    type: actions.AUTH_FAILED,
    error
});

export const auth = ({ email, password }) => (
    async dispatch => {
        try {
            dispatch(authStart());

            const data = {
                email,
                password
            }

            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const user = await response.json();

            if (user.error) return dispatch(authFailed(user.message));

            document.cookie = `userId=${user.data.user._id}`
            document.cookie = `token=${user.token}`

            dispatch(authSuccess(user.data.user._id, user.token))
        } catch (e) {
            dispatch(authFailed(e.message))
        }
    }
)
//
// export const autSignUp = (data) => (
//     async dispatch => {
//         try {
//             dispatch(authStart());
//
//             const response = await fetch('http://localhost:5000/api/user/sign-up', {
//                 method: 'POST',
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//
//             const user = await response.json();
//
//             if (user.error) return dispatch(authFailed(user.message));
//
//             document.cookie = `userId=${user.data.user._id}`
//             document.cookie = `token=${user.token}`
//
//             dispatch(authSuccess(user.data.user._id, user.token))
//         } catch (e) {
//             dispatch(authFailed(e))
//         }
//     }
// )