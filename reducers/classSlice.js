import { createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const classCollectionRef = collection(db, "Classes");

const initialState = {
  loading: false,
  classes: [],
  error: "",
};

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    setClasses: (state, action) => {
      state.loading = false;
      state.classes = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, setClasses, setError } = classSlice.actions;

export const subscribeToClasses = () => (dispatch) => {
  try {
    dispatch(startLoading());

    const unsubscribe = onSnapshot(classCollectionRef, (snapshot) => {
      const classes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setClasses(classes));
    });
    (error) => {
      console.error("Error fetching classes", error);
      dispatch(setError(error.message || "Failed to classes."));
    };

    return unsubscribe;
  } catch (error) {
    console.error(error);
  }
};

export default classSlice.reducer;

// export const fetchClasses = createAsyncThunk(
//   "classes/fetchClasses",
//   async () => {
//     try {
//       const data = await getDocs(classCollectionRef);
//       const Class = data.docs.map((doc) => {
//         const id = doc.id;
//         const classInfo = doc.data();
//         return { id, ...classInfo };
//       });
//       return Class;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// extraReducers: (builder) => {
//   builder.addCase(fetchClasses.pending, (state) => {
//     state.loading = true;
//     state.error = "";
//   });
//   builder.addCase(fetchClasses.fulfilled, (state, action) => {
//     state.loading = false;
//     state.classes = action.payload;
//   });
//   builder.addCase(fetchClasses.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.error.message || "Failed to fetch classes.";
//   });
// },
