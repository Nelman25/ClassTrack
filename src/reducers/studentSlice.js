import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  loading: false,
  students: [],
  error: "",
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ classId, uid }) => {
    try {
      const data = await getDocs(
        collection(db, "Users", uid, "Classes", classId, "Students")
      );
      const students = data.docs.map((doc) => {
        const studentInfo = doc.data();
        return { ...studentInfo, docId: doc.id };
      });
      return students;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch students.";
    });
  },
});

export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;
