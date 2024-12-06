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
  async (classId) => {
    try {
      const data = await getDocs(collection(db, `Classes/${classId}/Students`));
      const students = data.docs.map((doc) => {
        const studentInfo = doc.data();
        return { ...studentInfo };
      });
      return students;
    } catch (error) {
      console.error(error);
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

// TODO: Ifetch nalang lahat ng student info ng isang class, let's say ang napili is
//       Information Management COM231, ang students ng Information Management COM231 lang ang mafefetch kasama yung mga grades and shi.
//       para magawa yun:

//      1. Dapat malaman natin kung ano yung class na pinili ni user.
//      2. Siguro thru getting the class id when a class was selected sa Dashboard.
//      3. After makuha yung section id, tsaka tayo gagawa ng getDocs request gamit tong
//         query na to => getDocs("Sections", selectedSectionId, "Students");
//      4. Dahil sa case na to, gagamitan ko nalang sya ng service functions

// MAIN TODO: BUOHIN MUNA YUNG BAGONG MODEL NG STUDENT STATE
