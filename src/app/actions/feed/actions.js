import * as actions from './types'

const popularsStart = () => ({
    type: actions.FEED_POPULARS_START
})

const popularsSuccess = populars => ({
    type: actions.FEED_POPULARS_SUCCESS,
    payload: {
        populars
    }
})

const popularsFailed = error => ({
    type: actions.FEED_POPULARS_FAILED,
    error
})

const randomsStart = () => ({
    type: actions.FEED_RANDOMS_START
})

const randomsSuccess = randoms => ({
    type: actions.FEED_RANDOMS_SUCCESS,
    payload: {
        randoms
    }
})

const randomsFailed = error => ({
    type: actions.FEED_RANDOMS_FAILED,
    error
})

function fetchData(start, success, failed, url) {
    return async dispatch => {
        try {
            dispatch(start())

            const response = await fetch(url);
            const result = await response.json();

            if (result.status === 'failed') {
                return dispatch(failed(`Oops.. ${result.error.message}`))
            }
            dispatch(success(result.data.data))
        } catch (e) {
            dispatch(failed(`Oops.. ${e}`))
        }
    }
}

export const fetchPopulars = () => (
    fetchData(popularsStart, popularsSuccess, popularsFailed, 'http://localhost:5000/api/tour')
);

export const fetchRandoms = () => (
    fetchData(randomsStart, randomsSuccess, randomsFailed, 'http://localhost:5000/api/tour')
);
