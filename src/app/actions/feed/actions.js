import * as actions from './types';
import { fetchData } from "../../../utils/asyncFetchDispatch";

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

const fetchTourStart = () => ({
    type: actions.FETCH_TOUR_START
})

const fetchTourSuccess = tour => ({
    type: actions.FETCH_TOUR_SUCCESS,
    payload: {
        tour
    }
})

const fetchTourFailed = error => ({
    type: actions.FETCH_TOUR_FAILED,
    error
})

export const fetchPopulars = () => (
    fetchData(popularsStart, popularsSuccess, popularsFailed, 'http://localhost:5000/api/tour')
);

export const fetchRandoms = () => (
    fetchData(randomsStart, randomsSuccess, randomsFailed, 'http://localhost:5000/api/tour')
);

export const fetchTour = (slug, readyTour) => {
    if (readyTour) {
        return dispatch => {
            dispatch(fetchTourSuccess(readyTour))
        }
    } else {
        return fetchData(fetchTourStart, fetchTourSuccess, fetchTourFailed, `http://localhost:5000/api/tour/${slug}`)
    }
};
