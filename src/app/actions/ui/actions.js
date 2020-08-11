import * as actions from './types';

export const setMobile = () => ({
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

export const finishProfilePhoto = () => ({
    type: actions.FINISH_PROFILE_PHOTO
})

export const showProfilePhoto = () => ({
    type: actions.SHOW_PROFILE_PHOTO
})

export const dismissError = () => ({
    type: actions.DISMISS_ERROR
})

export const showError = error => ({
    type: actions.SHOW_ERROR,
    error
})