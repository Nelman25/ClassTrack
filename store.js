import { configureStore } from "@reduxjs/toolkit";
import gradeSlice from "./reducers/gradeSlice";
import studentInfoSlice from "./reducers/studentInfoSlice";
import sectionSlice from "./reducers/sectionSlice";

const store = configureStore({
  reducer: {
    grade: gradeSlice,
    info: studentInfoSlice,
    sections: sectionSlice,
  },
});

export default store;
