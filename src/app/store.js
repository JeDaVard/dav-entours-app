import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './reducers/ui/uiReducer';
import searchLocationReducer from './reducers/searchLocation/searchLocationReducer';

export default configureStore({
  reducer: {
    ui: uiReducer,
    searchLocation: searchLocationReducer,
  },
});
