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

const discoversStart = () => ({
    type: actions.FEED_DISCOVERS_START
})

const discoversSuccess = discovers => ({
    type: actions.FEED_DISCOVERS_SUCCESS,
    payload: {
        discovers
    }
})

const discoversFailed = error => ({
    type: actions.FEED_DISCOVERS_FAILED,
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
    fetchData(popularsStart, popularsSuccess, popularsFailed, `${process.env.REACT_APP_SERVER}/api/tour`)
);

export const fetchDiscovers = () => (
    fetchData(discoversStart, discoversSuccess, discoversFailed, `${process.env.REACT_APP_SERVER}/api/tour`)
);

export const fetchTour = (slug, readyTour) => {
    if (readyTour) {
        return dispatch => {
            dispatch(fetchTourSuccess(readyTour))
        }
    } else {
        return fetchData(fetchTourStart, fetchTourSuccess, fetchTourFailed, `${process.env.REACT_APP_SERVER}/api/tour/${slug}`)
    }
};
