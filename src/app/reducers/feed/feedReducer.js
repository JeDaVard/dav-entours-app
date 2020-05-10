import * as actionTypes from '../../actions/feed/types'

const initialState = {
    populars: {
        loading: true,
        data: []
    },
    randoms: {
        loading: true,
        data: []
    },
    tour: {
        loading: true,
        data: {}
    },
    error: null
};

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FEED_POPULARS_START:
            return {
                ...state,
                populars: {
                  ...state.populars,
                    loading: true
                },
                error: null
            }
        case actionTypes.FEED_POPULARS_SUCCESS:
            return {
                ...state,
                populars: {
                    data: action.payload.populars,
                    loading: false
                }
            }
        case actionTypes.FEED_POPULARS_FAILED:
            return {
                ...state,
                populars: {
                    ...state.populars,
                    loading: false
                },
                error: action.error
            }
        case actionTypes.FEED_RANDOMS_START:
            return {
                ...state,
                randoms: {
                    ...state.randoms,
                    loading: true
                },
                error: null
            }
        case actionTypes.FEED_RANDOMS_SUCCESS:
            return {
            ...state,
            randoms: {
                data: action.payload.randoms,
                loading: false
            }
        }
        case actionTypes.FEED_RANDOMS_FAILED:
            return {
                ...state,
                randoms: {
                    ...state.randoms,
                    loading: false
                },
                error: action.error
            }
        case actionTypes.FETCH_TOUR_START:
            return {
                ...state,
                tour: {
                    ...state.tour,
                    loading: true
                },
                error: null
            }
        case actionTypes.FETCH_TOUR_SUCCESS:
            return {
                ...state,
                tour: {
                    data: action.payload.tour,
                    loading: false
                }
            }
        case actionTypes.FETCH_TOUR_FAILED:
            return {
                ...state,
                tour: {
                    ...state.tour,
                    loading: false
                },
                error: action.error
            }
            default:
                return state
    }
}

export default feedReducer