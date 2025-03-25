import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  // initialState: null,
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeUser: () => {
      return null;
    },
    displayPodcastFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addUser, updateUser, removeUser, displayPodcastFailure } =
  userSlice.actions;

export default userSlice.reducer;
