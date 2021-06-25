import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/userSlice";
const store = configureStore({
  reducer: {
    User: UserReducer,
  },
});

export default store;
