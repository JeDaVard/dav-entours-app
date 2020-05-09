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
            default:
                return state
    }
}

export default feedReducer