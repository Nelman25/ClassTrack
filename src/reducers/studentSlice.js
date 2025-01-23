import { createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

const initialState = {
  loading: false,
  students: [],
  error: "",
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    startLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    setStudents: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addStudent, startLoading, setStudents, setError } =
  studentSlice.actions;

export const subscribeToStudents =
  ({ classId, uid }) =>
  (dispatch) => {
    if (!uid || !classId) {
      console.error("Missing uid or classId");
      return () => {}; // Return empty cleanup function
    }

    try {
      dispatch(startLoading());

      const unsubscribe = onSnapshot(
        collection(db, "Users", uid, "Classes", classId, "Students"),
        (snapshot) => {
          const students = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(setStudents(students));
        },
        (error) => {
          console.error("Error fetching students, ", error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error(error);
      dispatch(setError(error.message || "Failed to fetch students."));
    }
  };

export default studentSlice.reducer;

// export const subscribeToStudents =
//   ({ classId, uid }) =>
//   (dispatch) => {
//     try {
//       dispatch(startLoading());

//       const unsubscribe = onSnapshot(
//         collection(db, "Users", uid, "Classes", classId, "Students"),
//         (snapshot) => {
//           const students = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           dispatch(setStudents(students));
//         },
//         (error) => {
//           console.error("Error fetching students", error);
//           dispatch(setError(error.message || "Failed to fetch students."));
//         }
//       );

//       return unsubscribe;
//     } catch (error) {
//       console.error(error);
//       dispatch(setError(error.message || "Failed to fetch students."));
//     }
//   };

// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";

// const initialState = {
//   loading: false,
//   students: [],
//   error: "",
// };

// export const fetchStudents = createAsyncThunk(
//   "students/fetchStudents",
//   async ({ classId, uid }) => {
//     try {
//       const data = await getDocs(
//         collection(db, "Users", uid, "Classes", classId, "Students")
//       );
//       const students = data.docs.map((doc) => {
//         const studentInfo = doc.data();
//         return { ...studentInfo, docId: doc.id };
//       });
//       return students;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );

// const studentSlice = createSlice({
//   name: "students",
//   initialState,
//   reducers: {
//     addStudent: (state, action) => {
//       state.students.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchStudents.pending, (state) => {
//       state.loading = true;
//       state.error = "";
//     });
//     builder.addCase(fetchStudents.fulfilled, (state, action) => {
//       state.loading = false;
//       state.students = action.payload;
//     });
//     builder.addCase(fetchStudents.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message || "Failed to fetch students.";
//     });
//   },
// });

// export const { addStudent } = studentSlice.actions;
