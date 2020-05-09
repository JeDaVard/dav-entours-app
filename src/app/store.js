import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authReducer';
import feedReducer from './reducers/feed/feedReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer
  },
});
