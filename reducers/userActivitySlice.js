import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classData: {},
  gradesChanges: [],
};

const userActivitySlice = createSlice({
  name: "userActivity",
  initialState,
  reducers: {
    setSelectedClass: (state, action) => {
      state.classData = action.payload;
    },
    setGradesChanges: (state, action) => {
      state.gradesChanges = state.gradesChanges.map((change) => {
        if (change.docId === action.payload.docId) {
          return { ...change, ...action.payload };
        }
        return change;
      });

      const isExisting = state.gradesChanges.some(
        (change) => change.docId === action.payload.docId
      );

      if (!isExisting) {
        state.gradesChanges.push(action.payload);
      }
    },
  },
});

export const currentSelectedClassId = (state) =>
  state.userActivity.selectedClassId;
export const { setSelectedClass, setGradesChanges } = userActivitySlice.actions;
export default userActivitySlice.reducer;
