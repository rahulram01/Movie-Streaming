import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Set initial state to an object with a user property
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
