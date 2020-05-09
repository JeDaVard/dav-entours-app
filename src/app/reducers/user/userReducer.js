import * as actionTypes from '../../actions/user/types'

const initialState = {
    users: {
        data: [],
        loading: false,
        error: null
    },
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true,
                    error: null
                }
            }
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: action.payload.users,
                    loading: false,
                    error: null
                }
            }
        case actionTypes.FETCH_USERS_FAILED:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    error: action.error
                }
            }
        default:
            return state
    }
}

export default userReducer;