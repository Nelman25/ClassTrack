import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./reducers/studentSlice";
import classSlice from "./reducers/classSlice";
import userActivitySlice from "./reducers/userActivitySlice";

const store = configureStore({
  reducer: {
    classes: classSlice,
    students: studentSlice,
    userActivity: userActivitySlice,
  },
});

export default store;
