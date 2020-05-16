import * as actionTypes from '../../actions/ui/types'

const initialState = {
    display: {
        isMobile: window.innerWidth < 743
    }
}

const uiReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.SMALL_WIDTH_DISPLAY:
            return {
                ...state,
                display: {
                    ...state.display,
                    isMobile: true
                }
            }
        case actionTypes.NORMAL_DISPLAY:
            return {
                ...state,
                display: {
                    ...state.display,
                    isMobile: false
                }
            }
        default:
            return state
    }
}

export default uiReducer