import * as actionTypes from '../../actions/ui/types'

const initialState = {
    display: {
        isMobile: window.innerWidth < 744,
    },
    loading: false,
    profilePhoto: false,
    error: null
}

const uiReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.SMALL_WIDTH_DISPLAY:
            return {
                ...state,
                display: {
                    ...state.display,
                    isMobile: true,
                    isTablet: false
                }
            }
        case actionTypes.NORMAL_DISPLAY:
            return {
                ...state,
                display: {
                    ...state.display,
                    isMobile: false,
                    isTablet: false
                }
            }
        case actionTypes.LOADING_OFF:
            return {
                ...state,
                loading: false
            }
        case actionTypes.LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SHOW_PROFILE_PHOTO:
            return {
                ...state,
                profilePhoto: true
            }
        case actionTypes.FINISH_PROFILE_PHOTO:
            return {
                ...state,
                profilePhoto: false
            }
        case actionTypes.SHOW_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.DISMISS_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default uiReducer