import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './uiSlice';
import userReducer from './userSlice';
import friendsReducer from './friendsSlice'

const store = configureStore({
    reducer:{
        ui:uiReducer,
        user:userReducer,
        friends:friendsReducer,
    }
});
export default store;