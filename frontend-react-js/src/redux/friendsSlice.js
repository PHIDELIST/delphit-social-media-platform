import { createSlice } from '@reduxjs/toolkit';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    users: [
    
    ],
    selectedUser: null,
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { selectUser } = friendsSlice.actions;

export const setSelectedUser = (userId) => (dispatch) => {
  dispatch(selectUser(userId));
  localStorage.setItem('selectedUser', JSON.stringify(userId));
};

export const getSelectedUser = () => {
  const selectedUser = localStorage.getItem('selectedUser');
  return selectedUser ? JSON.parse(selectedUser) : null;
};

export default friendsSlice.reducer;
