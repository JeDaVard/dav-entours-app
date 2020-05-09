import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authReducer';
import feedReducer from './reducers/feed/feedReducer';
import userReducer from './reducers/user/userReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    user: userReducer,
  },
});
