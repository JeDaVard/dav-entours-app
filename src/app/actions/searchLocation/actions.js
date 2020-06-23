import * as actions from './types';

export const startSearchLoc = () => ({
    type: actions.START_SEARCH_LOC
})

export const endSearchLoc = () => ({
    type: actions.END_SEARCH_LOC
})

export const newViewport = (viewport) => {
    console.log(viewport)
    return ({
        type: actions.NEW_VIEWPORT,
        viewport
    })
}