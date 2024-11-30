import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const classCollectionRef = collection(db, "Classes");

const initialState = {
  loading: false,
  classes: [],
  error: "",
};

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async () => {
    try {
      const data = await getDocs(classCollectionRef);
      const Class = data.docs.map((doc) => {
        const id = doc.id;
        const classInfo = doc.data();
        return { id, ...classInfo };
      });
      return Class;
    } catch (error) {
      console.error(error);
    }
  }
);

const classSlice = createSlice({
  name: "classes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.loading = false;
      state.classes = action.payload;
    });
    builder.addCase(fetchClasses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch classes.";
    });
  },
});

export default classSlice.reducer;
