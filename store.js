import { configureStore } from "@reduxjs/toolkit";
// import gradeSlice from "./reducers/gradeSlice";
// import studentInfoSlice from "./reducers/studentInfoSlice";
// import sectionSlice from "./reducers/sectionSlice";
import studentSlice from "./reducers/studentSlice";
import classSlice from "./reducers/classSlice";

const store = configureStore({
  reducer: {
    classes: classSlice,
    students: studentSlice,
  },
});

export default store;
