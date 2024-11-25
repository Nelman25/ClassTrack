import { configureStore } from "@reduxjs/toolkit";
import gradeSlice from "./reducers/gradeSlice";
import studentInfoSlice from "./reducers/studentInfoSlice";

const store = configureStore({
  reducer: {
    grade: gradeSlice,
    info: studentInfoSlice,
  },
});

export default store;
