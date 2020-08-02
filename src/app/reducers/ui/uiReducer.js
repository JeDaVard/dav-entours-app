import * as actionTypes from '../../actions/ui/types'

const initialState = {
    display: {
        isMobile: window.innerWidth < 744,
        isTablet: window.innerWidth >= 744 && window.innerWidth <= 950
    },
    loading: false
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
        case actionTypes.MEDIUM_WIDTH_DISPLAY:
            return {
                ...state,
                display: {
                    ...state.display,
                    isTablet: true,
                    isMobile: false
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
        default:
            return state
    }
}

export default uiReducer