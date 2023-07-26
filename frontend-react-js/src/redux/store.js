import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import userReducer from './userSlice';
import friendsReducer from './friendsSlice';
import loadingReducer from './loadingSlice'; 

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    friends: friendsReducer,
    loading: loadingReducer, 
  },
});

export default store;
