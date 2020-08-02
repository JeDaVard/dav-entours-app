import * as actions from './types';

export const setMobile = () => ({
    type: actions.SMALL_WIDTH_DISPLAY
})

export const setTablet = () => ({
    type: actions.SMALL_WIDTH_DISPLAY
})

export const setDesktop = () => ({
    type: actions.NORMAL_DISPLAY
})

export const loadingOff = () => ({
    type: actions.LOADING_OFF
})

export const loadingOn = () => ({
    type: actions.LOADING_ON
})