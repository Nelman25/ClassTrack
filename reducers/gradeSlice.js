import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const studentsCollectionsRef = collection(db, "Students");

const initialState = {
  loading: false,
  grades: [],
  error: "",
};

export const fetchGrades = createAsyncThunk("grades/fetchGrades", async () => {
  try {
    const data = await getDocs(studentsCollectionsRef);
    const grades = data.docs.map((doc) => {
      const id = doc.id;
      const { quizzes, labScores, project, finalExam } = doc.data();

      return { id, quizzes, labScores, project, finalExam };
    });
    return grades;
  } catch (err) {
    console.error(err);
  }
});

const gradeSlice = createSlice({
  name: "grades",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGrades.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchGrades.fulfilled, (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    });
    builder.addCase(fetchGrades.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch grades.";
    });
  },
});

export default gradeSlice.reducer;
