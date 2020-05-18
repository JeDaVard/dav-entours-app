import * as actionTypes from '../../actions/feed/types'

const initialState = {
    populars: {
        loading: true,
        data: []
    },
    discovers: {
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
        case actionTypes.FEED_DISCOVERS_START:
            return {
                ...state,
                discovers: {
                    ...state.discovers,
                    loading: true
                },
                error: null
            }
        case actionTypes.FEED_DISCOVERS_SUCCESS:
            return {
            ...state,
            discovers: {
                data: action.payload.discovers,
                loading: false
            }
        }
        case actionTypes.FEED_DISCOVERS_FAILED:
            return {
                ...state,
                discovers: {
                    ...state.discovers,
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