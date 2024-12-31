import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  loading: false,
  grades: [],
  error: "",
};

export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async (classId) => {
    try {
      const data = await getDocs(collection(db, `Classes/${classId}/Students`));
      const students = data.docs.map((doc) => {
        const { quizzes, labScores, project, finalExam, studentNumber } =
          doc.data();
        return { quizzes, labScores, project, finalExam, studentNumber };
      });
      return students;
    } catch (error) {
      console.error(error);
    }
  }
);

const gradesSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    editGrades: (state, action) => {
      const { studentId, gradeType, key, value } = action.payload;
      const selectedStudentIndex = state.grades.findIndex(
        (student) => student.studentNumber === studentId
      );

      if (gradeType === "quizzes" || gradeType === "labScores") {
        state.grades[selectedStudentIndex][gradeType][key] = value;
      } else {
        state.grades[selectedStudentIndex][gradeType] = value;
      }
    },
  },
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
      state.error = action.error.message || "Failed to fetch student grades.";
    });
  },
});

export const { editGrades } = gradesSlice.actions;
export default gradesSlice.reducer;
