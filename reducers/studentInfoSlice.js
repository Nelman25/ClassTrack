import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const studentCollectionsRef = collection(db, "Students");

const initialState = {
  loading: false,
  studentInfo: [],
  error: "",
};

export const fetchStudentInfo = createAsyncThunk(
  "studentInfo/fetchStudentInfo",
  async () => {
    try {
      const data = await getDocs(studentCollectionsRef);
      const info = data.docs.map((doc) => {
        const id = doc.id;
        const { name, email, studentNumber, course, address } = doc.data();
        return { id, name, email, studentNumber, course, address };
      });
      return info;
    } catch (err) {
      console.error(err);
    }
  }
);

const studentInfoSlice = createSlice({
  name: "studentInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStudentInfo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchStudentInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.studentInfo = action.payload;
    });
    builder.addCase(fetchStudentInfo.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Failed to fetch student information.";
    });
  },
});

export default studentInfoSlice.reducer;
