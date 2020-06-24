import * as actions from './types';

export const startSearchLoc = (viewport) => ({
    type: actions.START_SEARCH_LOC,
    viewport
})

export const endSearchLoc = (viewport) => ({
    type: actions.END_SEARCH_LOC,
    viewport
})

export const newViewport = (viewport) => {
    return ({
        type: actions.NEW_VIEWPORT,
        viewport
    })
}

export const selectedLocation = (selLoc) => {
    return ({
        type: actions.SELECTED_LOCATION,
        selLoc
    })
}