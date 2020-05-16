import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authReducer';
import feedReducer from './reducers/feed/feedReducer';
import userReducer from './reducers/user/userReducer';
import uiReducer from './reducers/ui/uiReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    user: userReducer,
    ui: uiReducer,
  },
});
