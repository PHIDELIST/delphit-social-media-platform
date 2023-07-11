import { createSlice } from '@reduxjs/toolkit';


const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser)
const initialState = storedUser || {};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action) => {
      const { user, email,token, userID, } = action.payload;
      console.log(action.payload)
      state.user = user;
      state.email = email;
      state.userID = userID;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = 'user';
      state.userID = 'userID';
      localStorage.removeItem('user');
    },

  
   
  },
});

export const { login, logout} = userSlice.actions;

export const selectUser = (state) => state.user;
console.log(selectUser)

export default userSlice.reducer;
