import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedClassId: "",
};

const userActivitySlice = createSlice({
  name: "userActivity",
  initialState,
  reducers: {
    setSelectedClass: (state, action) => {
      state.selectedClassId = action.payload;
    },
  },
});

export const { setSelectedClass } = userActivitySlice.actions;
export default userActivitySlice.reducer;
