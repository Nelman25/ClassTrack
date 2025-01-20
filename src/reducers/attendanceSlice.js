import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  loading: false,
  attendance: {},
  dates: [],
  documentId: "",
  error: "",
};

export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (classId) => {
    try {
      const data = await getDocs(
        collection(db, `Classes/${classId}/Attendance`)
      );
      const students = data.docs.map((doc) => {
        const attendanceData = doc.data();
        const documentId = doc.id;
        console.log({ ...attendanceData, documentId });
        return { ...attendanceData, documentId };
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
  extraReducers: (builder) => {
    builder.addCase(fetchAttendance.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.attendance = action.payload.students[0].attendanceState;
      state.dates = action.payload.students[0].dateState;
      state.documentId = action.payload.students[0].documentId;
    });
    builder.addCase(fetchAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch attendance.";
    });
  },
});

export default attendanceSlice.reducer;
