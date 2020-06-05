import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authReducer';
import userReducer from './reducers/user/userReducer';
import uiReducer from './reducers/ui/uiReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
  },
});
