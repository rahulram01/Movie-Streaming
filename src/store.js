import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./utils/userSlice";
import audioplayerReducer from "./stores/audioplayerSlice"; // Import the audioplayer reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    audioplayer: audioplayerReducer, // Add the audioplayer reducer here
  },
});

export default store;
