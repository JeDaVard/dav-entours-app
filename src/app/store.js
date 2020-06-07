import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './reducers/ui/uiReducer';

export default configureStore({
  reducer: {
    ui: uiReducer,
  },
});
