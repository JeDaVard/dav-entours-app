import * as actionTypes from '../../actions/searchLocation/types'

const initialState = {
    searching: false,
    viewport: {
        longitude: -116.214531,
        latitude: 51.417611,
        zoom: 4
    },
    selLoc: {}
}

const searchLocation = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.START_SEARCH_LOC:
            return {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCH_LOC:
            return {
                ...state,
                searching: false
            }
        case actionTypes.NEW_VIEWPORT:
            return {
                ...state,
                viewport: action.viewport
            }
        case actionTypes.SELECTED_LOCATION:
            return {
                ...state,
                selLoc: action.selLoc
            }
        default:
            return state
    }
}

export default searchLocation