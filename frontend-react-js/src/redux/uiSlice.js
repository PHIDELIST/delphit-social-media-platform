import {createSlice} from "@reduxjs/toolkit"

const storedUI = localStorage.getItem("ui");
const initialState = {
    ui:storedUI || "profile",
};

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        homeUI:(state, action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        },
        notificationsUI:(state, action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        },
        chatsUI:(state, action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        },
        friendsUI:(state,action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        },
        profileUI:(state,action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        },
        editprofileUI:(state,action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        
        },
        createpostUI:(state,action) => {
            state.ui = action.payload;
            localStorage.setItem("ui", action.payload);
        
        }
    }
})

export const {homeUI,notificationsUI,chatsUI,friendsUI,profileUI,editprofileUI,createpostUI} = uiSlice.actions;
export default uiSlice.reducer;