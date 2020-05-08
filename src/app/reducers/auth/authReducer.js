import * as actionTypes from '../../actions/auth/types'

const initialState = {
    token: null,
    userId: null,
    photo: 'default.jpg',
    name: 'Entours',
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: action.payload.id,
                token: action.payload.token,
                photo: action.payload.photo,
                name: action.payload.name
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                token: null,
                userId: null,
                photo: 'default.jpg',
                name: 'Entours'
            }
        default:
            return state
    }
}

export default authReducer;