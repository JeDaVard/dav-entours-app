import * as actionTypes from '../../actions/user/types'

const initialState = {
    users: {
        data: [],
        loading: false,
    },
    user: {
        data: {},
        loading: false,
    },
    me: {
      saved: {
          data: [],
          loading: false
      }
    },
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true
                },
                error: null
            }
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: action.payload.users,
                    loading: false
                },
                error: null
            }
        case actionTypes.FETCH_USERS_FAILED:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                },
                error: action.error
            }
        case actionTypes.FETCH_USER_START:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true
                },
                error: null
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload.user,
                    loading: false
                },
                error: null
            }
        case actionTypes.FETCH_USER_FAILED:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                },
                error: action.error
            }
        case actionTypes.FETCH_USER_SAVED_START:
            return {
                ...state,
                me: {
                    ...state.me,
                    saved: {
                        ...state.me.saved,
                        loading: true
                    }
                },
                error: null
            }
        case actionTypes.FETCH_USER_SAVED_SUCCESS:
            return {
                ...state,
                me: {
                    ...state.me,
                    saved: {
                        data: action.payload.saved,
                        loading: false
                    }
                },
                error: null
            }
        case actionTypes.FETCH_USER_SAVED_FAILED:
            return {
                ...state,
                me: {
                    ...state.me,
                    saved: {
                        ...state.me.saved,
                        loading: false
                    }
                },
                error: action.error
            }
        default:
            return state
    }
}

export default userReducer;