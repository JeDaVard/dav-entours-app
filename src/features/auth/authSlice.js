import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null
};

const reducers = {
    login: state => {
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers
})