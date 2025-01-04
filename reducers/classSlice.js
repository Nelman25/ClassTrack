import { createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";


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

export const subscribeToClasses = (uid) => (dispatch) => {
  try {
    dispatch(startLoading());

    const unsubscribe = onSnapshot(
      collection(db, "Users", uid, "Classes"),
      (snapshot) => {
        const classes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setClasses(classes));
      }
    );
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
