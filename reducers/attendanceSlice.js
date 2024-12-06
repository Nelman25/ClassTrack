import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "config/firebase";

const initialState = {
  loading: false,
  attendance: {},
  error: "",
};

export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (classId) => {
    try {
      const data = await getDocs(collection(db, `Classes/${classId}/Students`));
      const students = data.docs.map((doc) => {
        const { attendance } = doc.data();
        return { attendance };
      });
      return students;
    } catch (error) {
      console.error(error);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    editAttendance: (state, action) => {
      state.attendance = {
        ...state.attendance,
        [action.payload.date]: action.payload.mark,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttendance.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.attendance = action.payload.attendance;
    });
    builder.addCase(fetchAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch attendance.";
    });
  },
});

export const { editAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
